import { Injectable } from '@angular/core';
import { bow } from '../model/bow';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  public favoritesSubject: BehaviorSubject<bow[]> = new BehaviorSubject<bow[]>([]);
  public favorites$: Observable<bow[]> = this.favoritesSubject.asObservable();

  constructor() { }

  setFavorites(favorites: bow[]) {
    this.favoritesSubject.next(favorites);
  }
}
