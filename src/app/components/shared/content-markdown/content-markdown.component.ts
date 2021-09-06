import { Component, Input } from '@angular/core';
import { DarkModeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-component-shared-content-markdown',
  templateUrl: './content-markdown.component.html',
  styleUrls: ['./content-markdown.component.scss'],
})
export class SharedContentMarkdownComponent {
  public isDarkMode: boolean;
  public isSrcMode: boolean;
  private _src: string | undefined;
  private _content: string | undefined;

  constructor(darkModeService: DarkModeService) {
    this.isDarkMode = false;
    this.isSrcMode = false;
    this._src = undefined;
    this._content = undefined;

    darkModeService.readDarkMode().subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  @Input()
  set src(value: string | undefined) {
    this._src = value;
    this.isSrcMode = true;
    this._content = undefined;
  }
  get src(): string | undefined {
    return this._src;
  }

  @Input()
  set content(value: string | undefined) {
    if (!this.isSrcMode) {
      this._content = value;
      this._src = undefined;
    }
  }
  get content(): string | undefined {
    return this._content;
  }
}
