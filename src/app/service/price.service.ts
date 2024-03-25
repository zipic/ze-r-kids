import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  private pricesSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  public prices$: Observable<number[]> = this.pricesSubject.asObservable();

  constructor() { }

  setPrices(prices: number[]) {
    this.pricesSubject.next(prices);
  }
}
