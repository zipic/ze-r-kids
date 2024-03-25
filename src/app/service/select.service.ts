import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectService {
  private selectedItemsSubject = new BehaviorSubject<string[]>([]);
  public selectedItems$ = this.selectedItemsSubject.asObservable();

  checkSelectItem(items: string[]) {
    this.selectedItemsSubject.next(items);
  }
}
