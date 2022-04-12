import { Time } from '@angular/common';

export class Page {
  public uid: string | undefined;
  public slug: string | undefined;
  public title: string | undefined;
  public content: string | undefined;
  public publishedAt: Time | undefined;
}
