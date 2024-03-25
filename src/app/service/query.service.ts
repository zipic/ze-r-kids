import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  public query$ = new Subject<string>();

  public changeQuery(query: string) {
    this.query$.next(query);
  }
}
