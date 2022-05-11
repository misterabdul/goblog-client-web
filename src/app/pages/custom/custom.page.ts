import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Page } from 'src/app/types/page.type';

@Component({
  selector: 'app-page-custom',
  templateUrl: './custom.page.html',
  styleUrls: ['./custom.page.scss'],
})
export class CustomPage implements OnInit {
  private _activatedRouteService: ActivatedRoute;

  private _page: Page | null;

  constructor(activatedRouteService: ActivatedRoute) {
    this._activatedRouteService = activatedRouteService;

    this._page = null;
  }

  ngOnInit(): void {
    this._page = this._activatedRouteService.snapshot.data.page;
  }

  get page(): Page | null {
    return this._page;
  }
}
