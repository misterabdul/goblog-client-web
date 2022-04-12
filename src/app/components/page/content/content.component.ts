import { Component, Input } from '@angular/core';

import { Page } from 'src/app/types/page.type';

@Component({
  selector: 'app-component-page-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class PageContentComponent {
  private _page: Page | null;

  constructor() {
    this._page = null;
  }

  @Input()
  set page(page: Page | null) {
    this._page = page;
  }

  get page(): Page | null {
    return this._page;
  }
}
