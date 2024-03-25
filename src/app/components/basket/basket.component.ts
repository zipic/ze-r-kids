import { Component, OnInit } from '@angular/core';
import { Observable, count, filter, map } from 'rxjs';
import { basketBows } from 'src/app/model/basketBows';
import { BuyService } from 'src/app/service/buy.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basketBows$: Observable<basketBows[]> | undefined;
  basketBows: basketBows[] = [];
  countSum:number = 0;
  totalSum!:number;

  constructor(private buyService: BuyService) {}

  ngOnInit(): void {
    this.basketBows$ = this.buyService.basketBows$;

    this.basketBows$?.subscribe(basket => {
      this.basketBows = basket;
      this.countSum = this.basketBows.reduce((sum, bow) => sum + bow.count, 0);
      this.getTotalSum();
    });
  }

  hanldeMinus(bow: basketBows) {
    if (bow.count > 1) {
      bow.count -= 1;
      this.updateCountSum();
      this.getTotalSum();
    }
  }

  handlePlus(bow: basketBows) {
    bow.count += 1;
    this.updateCountSum();
    this.getTotalSum();
  }

  updateCountSum() {
    this.countSum = this.basketBows.reduce((sum, bow) => sum + bow.count, 0);
  }

  getTotalSum() {
    this.totalSum = this.basketBows.reduce((sum, bow) => sum + bow.bow.price * bow.count, 0);
  }

  handleDelete(bow: basketBows) {
    this.basketBows = this.basketBows.filter(b => b.bow.id !== bow.bow.id);
    this.buyService.setToBasket(this.basketBows);
    this.updateCountSum();
    this.getTotalSum();
  }
}
