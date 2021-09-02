import { Component } from '@angular/core';
import { DarkModeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-component-shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class SharedHeaderComponent {
  private darkModeService: DarkModeService;
  public isDarkMode: boolean;

  constructor(darkModeService: DarkModeService) {
    this.darkModeService = darkModeService;
    this.isDarkMode = false;

    this.darkModeService.readDarkMode().subscribe((isDarkMode: boolean) => {
      this.isDarkMode = isDarkMode;
    });
  }

  public toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
}
