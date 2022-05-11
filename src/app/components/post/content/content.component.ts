import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post } from 'src/app/types/post.type';

@Component({
  selector: 'app-component-post-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class PostContentComponent implements OnInit {
  private _activatedRouteService: ActivatedRoute;

  private _post: Post | null;

  constructor(activatedRouteService: ActivatedRoute) {
    this._activatedRouteService = activatedRouteService;

    this._post = null;
  }

  ngOnInit(): void {
    this._post = this._activatedRouteService.snapshot.data.post;
  }

  get post(): Post {
    return this._post!;
  }
}
