import { Component } from '@angular/core';
import { DarkModeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class LayoutDefaultComponent {
  public isDarkMode: boolean = false;

  constructor(darkmodeService: DarkModeService) {
    this.isDarkMode = false;

    darkmodeService.readDarkMode().subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }
}
