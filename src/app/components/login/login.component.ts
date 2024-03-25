import { Component } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login!: boolean;
  email: string = '';
  password: string = '';
  registerButtonDisabled: boolean = true;

  constructor(private loginService: LoginService) {
    loginService.isLogin$.subscribe(item => {
      this.login = item;
    })
  }

  closeLoginMenu() {
    this.loginService.setLogin(!this.login);
  }
}
