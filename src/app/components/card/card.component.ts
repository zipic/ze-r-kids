import { Component, Input, OnInit } from '@angular/core';
import { bow } from 'src/app/model/bow';
import { FilterService } from 'src/app/service/filter.service';
import { Observable, count, map, of } from 'rxjs';
import { FavoriteService } from 'src/app/service/favorite.service';
import { BuyService } from 'src/app/service/buy.service';
import { basketBows } from 'src/app/model/basketBows';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() products: bow[] = [];
  @Input() prices: number[] = [];
  @Input() items: string[] = [];
  @Input() query: string = '';
  @Input() name!: string;
  @Input() favoriteBows$: Observable<bow[]> | undefined;
  @Input() basketBows$: Observable<basketBows[]> | undefined;
  favoriteBows: bow[] = [];
  basketBows: basketBows[] = [];

  constructor(
    private filterService: FilterService,
    private favoriteService: FavoriteService,
    private buyService: BuyService
  ) {}

  ngOnInit(): void {
    this.favoriteBows$ = this.favoriteService.favorites$;
    this.basketBows$ = this.buyService.basketBows$;

    if (this.favoriteBows$) {
      this.favoriteBows$.subscribe(favoriteBows => {
        this.favoriteBows = favoriteBows || [];
      });
    }

    if(this.basketBows$) {
      this.basketBows$.subscribe(bows => {
        this.basketBows = bows;
      })
    }
  }

  filteredProducts(query: string | null, items: string[] | null, prices: number[] | null = [], name: string) {
    const filtered = this.filterService.filterProducts(this.products, query || '', items || [], prices || [], name);
    return filtered;
  }


  addFavorites(bow: bow) {
    const isAlreadyFavorite = this.favoriteService.favoritesSubject.value.some(favorite => favorite.id === bow.id);

    if (bow) {
      if (isAlreadyFavorite) {
        const index = this.favoriteService.favoritesSubject.value.findIndex(favorite => favorite.id === bow.id);
        const updatedFavorites = [...this.favoriteService.favoritesSubject.value];
        updatedFavorites.splice(index, 1);
        this.favoriteService.setFavorites(updatedFavorites);
        this.favoriteBows = updatedFavorites;
      } else {
        const updatedFavorites = [...this.favoriteService.favoritesSubject.value, bow];
        this.favoriteService.setFavorites(updatedFavorites);
        this.favoriteBows = updatedFavorites;
      }
    }
  }

  isFavorite(bow: bow): boolean {
    return this.favoriteBows.some(favorite => favorite.id === bow.id);
  }

  inBasket(bow:bow): boolean {
    return this.basketBows.some(b => b.bow.id === bow.id);
  }


  addToBasket(bow: bow) {
    const isAlreadyOnBasket = this.buyService.behaviorSubject.value.some(item => item.bow.id === bow.id);

    if (bow) {
      if (isAlreadyOnBasket) {
        const updatedBasket = this.buyService.behaviorSubject.value.map(item => {
          if (item.bow.id === bow.id) {
            return { ...item, count: item.count - 1 }; // Adjust the count as needed
          }
          return item;
        }).filter(item => item.count > 0);

        this.buyService.setToBasket(updatedBasket);
        this.basketBows = updatedBasket;
      } else {
        const updatedBasket = [...this.buyService.behaviorSubject.value, { bow, count: 1 }];
        this.buyService.setToBasket(updatedBasket);
        this.basketBows = updatedBasket;
      }
    }
  }
}
