import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { basketBows } from 'src/app/model/basketBows';
import { bow } from 'src/app/model/bow';
import { BuyService } from 'src/app/service/buy.service';
import { FavoriteService } from 'src/app/service/favorite.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  favoriteBows$: Observable<bow[]> = new Observable<bow[]>();
  basketBows$: Observable<basketBows[]> = new Observable<basketBows[]>();
  isLogin: boolean = false;

  constructor(
    private favoriteService: FavoriteService,
    private buyService: BuyService,
    private loginService: LoginService
    ) {
    this.favoriteBows$ = favoriteService.favorites$;
    this.basketBows$ = buyService.basketBows$;
    this.loginService.isLogin$.subscribe(isLogin => {
      this.isLogin = isLogin;
    });
  }

  isOpen(): void {
    this.loginService.setLogin(!this.isLogin);
  }
}
