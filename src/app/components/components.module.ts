import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownModule } from '@misterabdul/ngx-markdown';

import { SharedHeaderComponent } from './shared/header/header.component';
import { SharedContentMarkdownComponent } from './shared/content-markdown/content-markdown.component';
import { PostItemComponent } from './post/item/item.component';

@NgModule({
  declarations: [
    SharedHeaderComponent,
    SharedContentMarkdownComponent,
    PostItemComponent,
  ],
  imports: [
    CommonModule,
    MarkdownModule.forChild(),
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    SharedHeaderComponent,
    SharedContentMarkdownComponent,
    PostItemComponent,
  ],
})
export class ComponentModule {}

export {
  SharedHeaderComponent,
  SharedContentMarkdownComponent,
  PostItemComponent,
};
