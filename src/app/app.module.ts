import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule, MarkedOptions } from '@misterabdul/ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { MarkedConfig } from './configs/marked.config';
import { PageModule } from './pages/pages.module';
import { DarkModeService } from './services/darkmode.service';
import { MsgPackInterceptor } from './utils/http.util';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  private _darkModeService: DarkModeService;

  private _body: HTMLElement;

  constructor(darkModeService: DarkModeService) {
    this._darkModeService = darkModeService;

    this._body = document.body;
  }

  ngOnInit(): void {
    this._darkModeService.darkModeSubject.subscribe({
      next: (isDarkMode) => {
        if (isDarkMode) {
          this._body.classList.add('dark-mode');
        } else {
          this._body.classList.remove('dark-mode');
        }
      },
    });
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: MarkedConfig.optionsFactory,
      },
    }),
    AppRoutingModule,
    PageModule,
  ],
  providers: [
    [{ provide: HTTP_INTERCEPTORS, useClass: MsgPackInterceptor, multi: true }],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
