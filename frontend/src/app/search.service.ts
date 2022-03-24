import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class SearchService {
    search:Subject<true> = new Subject();
}