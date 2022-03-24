import uWebSocket, { DEDICATED_COMPRESSOR_3KB } from 'uWebSockets.js';

interface Journey {
  start: string;
  stop: string;
  time: Date;
}

interface JourneyInfo extends Journey {
  start: string;
  stop: string;
  time: Date;
  spots: number;
  occupied: [Date, number];
  recommended: Date;
  alternative: JourneyInfo[];
}

interface User {
  journeys: JourneyInfo[];
}

interface MessageToServer {
  type: 'search' | 'getLast';
  content?: Journey;
}

interface MessageFromServer {
  type: 'connectionInfo' | 'journeyInfo' | 'fail' | 'lastJourneys';
  content?: string | JourneyInfo | JourneyInfo[];
}

require('dotenv').config();

const sslKeyFile = process.env.CONNECT_X_SSL_KEY_FILE || '';
const sslCertFile = process.env.CONNECT_X_SSL_CERT_FILE || '';

const createId = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}

const monitoringKey = process.env.CONNECT_X_MONITORING_KEY || createId(20);

const users: {
  [index: string]: User;
} = {};

const app = sslKeyFile && sslCertFile ? uWebSocket.SSLApp({
  key_file_name: sslKeyFile,
  cert_file_name: sslCertFile
}) : uWebSocket.App();

const webSocket = app.ws('/*', {
  idleTimeout: 32,
  maxBackpressure: 1024,
  maxPayloadLength: 512,
  compression: DEDICATED_COMPRESSOR_3KB,
  upgrade: (res, req, context) => {
    res.upgrade(
      {
        url: req.getUrl(),
        query: req.getQuery()
      },
      req.getHeader('sec-websocket-key'),
      req.getHeader('sec-websocket-protocol'),
      req.getHeader('sec-websocket-extensions'),
      context
    );
  },
  open: (ws) => {
    ws.opened = { opened: true };
    console.log('open');
    const splitQuery = ws.query.split('&');
    let userId = splitQuery.find((queryParam: string) => queryParam.match(/^user=[a-zA-Z0-9]{20}$/))?.replace(/^user=/, '');
    let user: User | null = null;
    if (userId) {
      user = users[userId];
    }
    else {
      userId = adduser();
      user = users[userId];
    }
    if (user) {
      ws.userId = userId;
      ws.user = user;
      ws.subscribe(userId);
      ws.send(JSON.stringify({type: 'connectionInfo', content: userId} as MessageFromServer));
      return;
    }
    ws.send(JSON.stringify({type: 'fail'}));
    setTimeout(() => {
      ws.close();
    });
  },
  message: (ws, message, isBinary) => {
    if (isBinary) {
      ws.end();
      return;
    }
    const user = ws.user;
    const playerId = ws.playerId;
    if (!user || !playerId) {
      return;
    }
    let receivedMessage: MessageToServer | undefined;
    try {
      const buffer = Buffer.from(message).toString();
      receivedMessage = JSON.parse(buffer);
    } catch (e: any) {}
    if (receivedMessage) {
      switch (receivedMessage.type) {
        case 'search':
          const result = searchJourney(receivedMessage.content as JourneyInfo);
          if (result) {
            ws.send(JSON.stringify({type: 'journeyInfo', content: result} as MessageFromServer));
          } else {
            ws.send(JSON.stringify({type: 'fail'} as MessageFromServer));
          }
          break;

        case 'getLast':
          ws.send(JSON.stringify({type: 'lastJourneys', content: ws.user} as MessageFromServer));
          break;
      }
    }
  },
  close: async (ws) => {
    ws.opened.opened = false;
    console.log('close');
  }
});

webSocket.listen(8084, (listenSocket) => {
  if (listenSocket) {
    console.log('Listening to port 8084');
  }
});

const adduser = (): string => {
  console.log('add user');
  const userId = createId(20);
    if (users[userId]) {
      return adduser();
    } else {
      users[userId] = { journeys: [] as JourneyInfo[] };
      console.log('added user');
    }
    return userId;
};

const searchJourney = (journey: Journey): JourneyInfo | null => {
  return null;
};

const monitoringApp = sslKeyFile && sslCertFile ? uWebSocket.SSLApp({
  key_file_name: sslKeyFile,
  cert_file_name: sslCertFile
}) : uWebSocket.App();

const monitoringWebSocket = monitoringApp.ws('/' + monitoringKey, {
  idleTimeout: 32,
  maxBackpressure: 1024,
  maxPayloadLength: 512,
  compression: DEDICATED_COMPRESSOR_3KB,
  upgrade: (res, req, context) => {
    res.upgrade(
      {
        url: req.getUrl(),
        query: req.getQuery()
      },
      req.getHeader('sec-websocket-key'),
      req.getHeader('sec-websocket-protocol'),
      req.getHeader('sec-websocket-extensions'),
      context
    );
  },
  open: (ws) => {
    ws.subscribe('monitorGameData');
    ws.send(JSON.stringify(users));
  }
});

monitoringWebSocket.listen(8085, (listenSocket) => {
  if (listenSocket) {
    console.log('Listening for monitoring to port 8085');
  }
});

let lastMonitoringGameData = '';

const monitoringInterval = setInterval(() => {
  const gameData = JSON.stringify(users);
  if (gameData != lastMonitoringGameData) {
    monitoringWebSocket.publish('monitorGameData', gameData);
    lastMonitoringGameData = gameData;
  }
}, 500);
