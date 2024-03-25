import { Component } from '@angular/core';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ze_r_kids';
  isLogin: boolean = false;

  constructor(private loginService: LoginService) {
    this.loginService.isLogin$.subscribe(item => {
      this.isLogin = item;
    })
  }
}
