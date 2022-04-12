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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownModule } from '@misterabdul/ngx-markdown';

import { SharedHeaderComponent } from './shared/header/header.component';
import { SharedContentMarkdownComponent } from './shared/content-markdown/content-markdown.component';
import { SharedSpinnerComponent } from './shared/spinner/spinner.component';

import { PostItemComponent } from './post/item/item.component';
import { PostItemShimmerComponent } from './post/item-shimmer/item-shimmer.component';
import { PostContentComponent } from './post/content/content.component';
import { PostCommentComponent } from './post/comment/comment.component';

import { PageContentComponent } from './page/content/content.component';

@NgModule({
  declarations: [
    SharedHeaderComponent,
    SharedContentMarkdownComponent,
    SharedSpinnerComponent,

    PostItemComponent,
    PostItemShimmerComponent,
    PostContentComponent,
    PostCommentComponent,

    PageContentComponent,
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
    MatProgressSpinnerModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  exports: [
    SharedHeaderComponent,
    SharedContentMarkdownComponent,
    SharedSpinnerComponent,

    PostItemComponent,
    PostItemShimmerComponent,
    PostContentComponent,
    PostCommentComponent,

    PageContentComponent,
  ],
})
export class ComponentModule {}

export {
  SharedHeaderComponent,
  SharedContentMarkdownComponent,
  SharedSpinnerComponent,
  PostItemComponent,
  PostItemShimmerComponent,
  PostContentComponent,
  PostCommentComponent,
  PageContentComponent,
};
