import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownModule } from '@misterabdul/ngx-markdown';

import { SharedHeaderComponent } from './shared/header/header.component';
import { SharedContentMarkdownComponent } from './shared/content-markdown/content-markdown.component';

import { PostItemComponent } from './post/item/item.component';
import { PostItemShimmerComponent } from './post/item-shimmer/item-shimmer.component';
import { PostContentComponent } from './post/content/content.component';
import { PostCommentComponent } from './post/comment/comment.component';

@NgModule({
  declarations: [
    SharedHeaderComponent,
    SharedContentMarkdownComponent,
    PostItemComponent,
    PostItemShimmerComponent,
    PostContentComponent,
    PostCommentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forChild(),
    MatRippleModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressBarModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  exports: [
    SharedHeaderComponent,
    SharedContentMarkdownComponent,
    PostItemComponent,
    PostItemShimmerComponent,
    PostContentComponent,
    PostCommentComponent,
  ],
})
export class ComponentModule {}

export {
  SharedHeaderComponent,
  SharedContentMarkdownComponent,
  PostItemComponent,
  PostItemShimmerComponent,
  PostContentComponent,
  PostCommentComponent,
};
