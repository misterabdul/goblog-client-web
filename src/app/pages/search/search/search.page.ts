import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post } from 'src/app/types/post.type';

@Component({
  selector: 'app-page-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  private _activatedRouteService: ActivatedRoute;

  private _posts: Array<Post> | null;

  constructor(activatedRoute: ActivatedRoute) {
    this._activatedRouteService = activatedRoute;

    this._posts = null;
  }

  ngOnInit(): void {
    this._posts = this._activatedRouteService.snapshot.data.posts;

    this._activatedRouteService.data.subscribe({
      next: (data) => {
        this._posts = data.posts;
      },
    });
  }

  get posts(): Array<Post> | null {
    return this._posts;
  }
}
