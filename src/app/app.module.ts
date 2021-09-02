import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { PageModule } from './pages/pages.module';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
class AppComponent {}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
