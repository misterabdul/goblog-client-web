import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownModule } from '@misterabdul/ngx-markdown';

import { SharedHeaderComponent } from './shared/header/header.component';
import { SharedContentMarkdownComponent } from './shared/content-markdown/content-markdown.component';
import { PostItemComponent } from './post/item/item.component';
import { PostContentComponent } from './post/content/content.component';

@NgModule({
  declarations: [
    SharedHeaderComponent,
    SharedContentMarkdownComponent,
    PostItemComponent,
    PostContentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MarkdownModule.forChild(),
    MatToolbarModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    SharedHeaderComponent,
    SharedContentMarkdownComponent,
    PostItemComponent,
    PostContentComponent,
  ],
})
export class ComponentModule {}

export {
  SharedHeaderComponent,
  SharedContentMarkdownComponent,
  PostItemComponent,
  PostContentComponent,
};
