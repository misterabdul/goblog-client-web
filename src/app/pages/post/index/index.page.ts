import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post } from 'src/app/types/post.type';

@Component({
  selector: 'app-page-post-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class PostIndexPage implements OnInit {
  private _activatedRouteService: ActivatedRoute;

  private _posts: Array<Post> | null;

  constructor(activatedRouteService: ActivatedRoute) {
    this._activatedRouteService = activatedRouteService;

    this._posts = new Array();
  }

  ngOnInit(): void {
    this._posts = this._activatedRouteService.snapshot.data.posts;
  }

  get posts(): Array<Post> | null {
    return this._posts;
  }
}
