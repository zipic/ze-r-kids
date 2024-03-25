import { Component } from '@angular/core';
import { QueryService } from 'src/app/service/query.service';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss']
})
export class FinderComponent {
  query: string = '';

  constructor(private readonly queryService: QueryService) {

  }

  find(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.query = value;
    this.queryService.changeQuery(value);
  }
}
