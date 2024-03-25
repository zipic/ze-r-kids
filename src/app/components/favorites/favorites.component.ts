import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { bow } from 'src/app/model/bow';
import { FavoriteService } from 'src/app/service/favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  products: bow[] = [];
  favoriteBows$!: Observable<bow[]>;

  constructor(private favoriteService: FavoriteService) {}


  ngOnInit(): void {
    this.favoriteBows$ = this.favoriteService.favorites$;

    this.favoriteBows$.subscribe(favoriteBows => {
      this.products = favoriteBows;
    });
  }
}
