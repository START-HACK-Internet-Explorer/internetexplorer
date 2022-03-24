import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject, ReplaySubject } from "rxjs";

export interface Journey {
  start: string;
  stop: string;
  time: Date;
}

export interface JourneyInfo extends Journey {
  searchStart: string,
  searchStop: string,
  searchTime: Date,
  start: string;
  stop: string;
  time: Date;
  duration: number;
  spots: number;
  occupied: [Date, number][];
  recommended: Date;
  alternative: JourneyInfo[];
}

interface MessageToServer {
  type: 'search' | 'getLast';
  content?: Journey;
}

interface MessageFromServer {
  type: 'connectionInfo' | 'journeyInfo' | 'fail' | 'lastJourneys';
  content?: string | JourneyInfo[];
}

const BACKEND_PROTOCOL = 'ws';
const BACKEND_ADDRESS = 'localhost';
const BACKEND_PORT = '8084';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private ws?: WebSocket;
  lastJourneys: BehaviorSubject<JourneyInfo[]> = new BehaviorSubject([] as JourneyInfo[]) as BehaviorSubject<JourneyInfo[]>;
  journeyInfos: BehaviorSubject<JourneyInfo[]> = new BehaviorSubject([] as JourneyInfo[]) as BehaviorSubject<JourneyInfo[]>;
  journeyInfo: BehaviorSubject<JourneyInfo | null> = new BehaviorSubject(null) as BehaviorSubject<JourneyInfo | null>;
  lastSearch?: Journey;
  private userId = '';
  private retries = 0;
  connected = false;
  private connectionFailed = false;

  constructor(private cookieService: CookieService) {
    this.connect();
  }

  connect() {
    if (this.retries > 10) {
      alert('your connection is bad, get a better one and then reload');
      return;
    }
    this.connectionFailed = false;
    this.connected = false;
    this.retries++;
    if (!this.userId) {
      this.ws = new WebSocket(`${BACKEND_PROTOCOL}://${BACKEND_ADDRESS}:${BACKEND_PORT}/`);
    } else {
      this.ws = new WebSocket(`${BACKEND_PROTOCOL}://${BACKEND_ADDRESS}:${BACKEND_PORT}/?user=${this.userId}`);
    }
    this.ws.onmessage = (event => {
      this.processInformation(event);
      this.retries = 0;
    });
    this.ws.onclose = (event => {
      if (!this.connectionFailed) {
        setTimeout(() => {
          this.connect();
        }, 5000);
      }
    });
  }

  search(start: string, stop: string, time: Date) {
    if (start && start.length < 50 && stop && stop.length < 50 && time > new Date()) {
      const sendMessage: MessageToServer = { type: 'search', content: { start, stop, time } as Journey };
      this.journeyInfos.next([]);
      this.ws?.send(JSON.stringify(sendMessage));
    }
  }

  setJourneyInfo(journeyInfo: JourneyInfo) {
    this.journeyInfo.next(journeyInfo);
  };

  getLast() {
    const sendMessage: MessageToServer = { type: 'getLast' };
    this.ws?.send(JSON.stringify(sendMessage));
  }

  private processInformation(event: { data: string }) {
    const msg: MessageFromServer = JSON.parse(event.data);
    console.log(msg);

    switch (msg.type) {
      case 'connectionInfo':
        this.connected = true;
        this.connectionFailed = false;
        this.userId = msg.content as string;
        const cookieValue = this.userId;
        this.cookieService.set('internet-explorer', cookieValue, 2);
        break;

      case 'lastJourneys':
        this.lastJourneys.next(msg.content as JourneyInfo[]);
        break;

      case 'journeyInfo':
        const journeyInfo = msg.content as JourneyInfo[];
        if (!this.lastSearch || (journeyInfo.every(info => this.lastSearch!.start === info.searchStart && this.lastSearch!.stop === info.searchStop && this.lastSearch!.time === info.searchTime))) {
          this.journeyInfos.next(journeyInfo);
        }
        break;

      case 'fail':
        if (!this.connected) {
          this.userId = '';
          this.connectionFailed = true;
        } else {
          this.journeyInfos.next([]);
          this.lastJourneys.next([]);
          alert('failed');
        }
        break;
    }
  }
}
