import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DarkModeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-component-shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class SharedHeaderComponent {
  private _darkModeService: DarkModeService;
  private _router: Router;
  private _isDarkMode: boolean = false;
  private _navItems: Array<Menu>;
  public searchQuery: string | undefined;

  constructor(
    route: ActivatedRoute,
    router: Router,
    darkModeService: DarkModeService
  ) {
    route.queryParams.subscribe({
      next: (params) => {
        this.searchQuery = params['q'];
      },
    });

    this._router = router;
    this._navItems = [new Menu('posts', '/post')];
    this._darkModeService = darkModeService;
    this._darkModeService.darkModeSubject.subscribe({
      next: (isDarkMode: boolean) => {
        this._isDarkMode = isDarkMode;
      },
    });
  }

  get isDarkMode(): boolean {
    return this._isDarkMode;
  }

  get navItems(): Array<Menu> {
    return this._navItems;
  }

  public doSearch() {
    if (this.searchQuery === undefined) this.searchQuery = '';
    this._router.navigateByUrl('/search?q=' + this.searchQuery);
  }

  public toggleDarkMode() {
    this._darkModeService.toggleDarkMode();
  }
}

class Menu {
  constructor(public label: string, public link: string) {}
}
