import { Component } from '@angular/core';

@Component({
  selector: 'app-page-home-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class HomeIndexPage {
  public content = `# Simple Blog App\nThis is my simple blog web app. Frontend built with Angular.
  Backend built with Gin Gonic & MongoDB database.\n
  # Sample\nCheckout the [markdown samples](./home/markdown-sample)`;
}
