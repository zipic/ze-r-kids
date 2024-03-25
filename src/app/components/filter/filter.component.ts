import { Component, Input, OnInit } from '@angular/core';
import { bow } from 'src/app/model/bow';
import { PriceService } from 'src/app/service/price.service';
import { SelectService } from 'src/app/service/select.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() products: bow[] = [];
  startValue: number = 30;
  endValue: number = 500;
  sliderValues: number[] = [this.startValue, this.endValue];
  selectedItems: string[] = [];
  colors: string[] = ['бежевий', 'синій', 'голубий', 'айворі', 'рожевий', 'чорно-білий', 'чорний', 'золотий'];

  constructor(
    private selectService: SelectService,
    private priceService: PriceService
  ) {}

  ngOnInit(): void {
    const savedItems = localStorage.getItem('selectedItems');
    const savedPriceValues = localStorage.getItem('sliderValues');
    const savedStartValue = localStorage.getItem('startValue');
    const savedEndValue = localStorage.getItem('endValue');

    if (savedItems) {
      this.selectedItems = JSON.parse(savedItems);
      this.selectService.checkSelectItem(this.selectedItems);
    }

    if (savedPriceValues) {
      this.sliderValues = JSON.parse(savedPriceValues);
      this.priceService.setPrices(this.sliderValues);
    }

    if (savedStartValue) {
      this.startValue = +savedStartValue;
    }

    if (savedEndValue) {
      this.endValue = +savedEndValue;
    }
  }

  onSliderChange() {
    this.updateSliderValues();
    this.priceService.setPrices(this.sliderValues);
    localStorage.setItem('sliderValues', JSON.stringify(this.sliderValues));
    localStorage.setItem('startValue', this.startValue.toString());
    localStorage.setItem('endValue', this.endValue.toString());
  }

  private updateSliderValues() {
    this.sliderValues = [this.startValue, this.endValue];
  }

  findItem(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const color = checkbox.value;

    if (checkbox.checked) {
      this.selectedItems.push(color);
      this.selectService.checkSelectItem(this.selectedItems);
    } else {
      const index = this.selectedItems.indexOf(color);
      if (index !== -1) {
        this.selectedItems.splice(index, 1);
        this.selectService.checkSelectItem(this.selectedItems);
      }
    }

    localStorage.setItem('selectedItems', JSON.stringify(this.selectedItems));
  }

  isChecked(color: string): boolean {
    return this.selectedItems.includes(color);
  }
}
