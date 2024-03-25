import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { basketBows } from '../model/basketBows';

@Injectable({
  providedIn: 'root'
})
export class BuyService {
  public behaviorSubject: BehaviorSubject<basketBows[]> = new BehaviorSubject<basketBows[]>([]);
  public basketBows$: Observable<basketBows[]> = this.behaviorSubject.asObservable();


  setToBasket(basketBows: basketBows[]) {
    this.behaviorSubject.next(basketBows);
  }
}
