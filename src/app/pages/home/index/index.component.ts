import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class HomeIndexComponent {
  public content = `# Simple Blog App\nThis is my simple blog web app. Frontend built with Angular.
  Backend built with Gin Gonic & MongoDB database.\n
  # Sample\nCheckout the [markdown samples](./home/markdown-sample)`;
}
