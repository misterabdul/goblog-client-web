import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchComponent {
  private _searchQuery: string | undefined;

  constructor(route: ActivatedRoute) {
    route.queryParams.subscribe((params) => {
      this._searchQuery = params['q'];
    });
  }

  get searchQuery(): string {
    return this._searchQuery!;
  }
}
