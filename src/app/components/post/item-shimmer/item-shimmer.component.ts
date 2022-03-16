import { Component } from '@angular/core';
import { DarkModeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-component-post-item-shimmer',
  templateUrl: './item-shimmer.component.html',
  styleUrls: ['./item-shimmer.component.scss'],
})
export class PostItemShimmerComponent {
  private _isDarkMode: boolean = false;

  constructor(darkModeService: DarkModeService) {
    darkModeService.darkModeSubject.subscribe({
      next: (isDarkMode) => {
        this._isDarkMode = isDarkMode;
      },
    });
  }

  get isDarkMode(): boolean {
    return this._isDarkMode;
  }
}
