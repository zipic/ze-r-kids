import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { bow } from 'src/app/model/bow';
import { DataService } from 'src/app/service/data.service';
import { LoginService } from 'src/app/service/login.service';
import { PriceService } from 'src/app/service/price.service';
import { QueryService } from 'src/app/service/query.service';
import { SelectService } from 'src/app/service/select.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  products: bow[] = [];
  prices: number[] = [];
  items: string[] = [];
  query: string = '';
  name: string = '';

  constructor(
    private dataservice: DataService,
    private queryService: QueryService,
    private selectService: SelectService,
    private priceService: PriceService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.priceService.prices$.subscribe(number => {
      this.prices = number;
    })
    this.queryService.query$.subscribe(word => {
      this.query = word;
    })
    this.selectService.selectedItems$.subscribe(item => {
      this.items = item;
    })
  }

  private loadData() {
    this.dataservice.getData().subscribe(data => this.products = Object.values(data));
  }

  changeFilter(event: MatTabChangeEvent) {
    if (event.tab.textLabel === 'Усі вироби') {
      this.name = '';
    } else {
      this.name = event.tab.textLabel;
    }
  }
}
