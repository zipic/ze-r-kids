import { Injectable } from '@angular/core';
import { bow } from '../model/bow';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  filterProducts(products: bow[], query: string, items: string[], prices: number[], name: string) {
    if (!query && !items.length && !prices.length && !name) {
      return products;
    }

    return products.filter(item => {
      const matchesQuery = !query || item.name.toLowerCase().includes(query.toLowerCase());
      const matchesColor = !items.length || items.includes(item.color.toLowerCase());
      const matchesPrice = !prices.length || (item.price >= prices[0] && item.price <= prices[1]);
      const matchesName = !name || name.toLowerCase().includes(item.name.toLowerCase());

      return matchesQuery && matchesColor && matchesPrice && matchesName;
    });
  }
}
