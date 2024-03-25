import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLogin$:Observable<boolean> = this.loginSubject.asObservable();

  constructor() { }

  setLogin(login:boolean) {
    this.loginSubject.next(login);
  }
}
