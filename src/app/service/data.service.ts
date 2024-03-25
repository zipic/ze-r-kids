import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { bow } from '../model/bow';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'assets/products.json';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<bow>(this.url);
  }

  getFilteredData(query: string): Observable<bow[]> {
    return this.http.get<bow[]>(this.url).pipe(
      map(data => data.filter(item => item.name.toLowerCase().includes(query.toLowerCase())))
    );
  }
}
