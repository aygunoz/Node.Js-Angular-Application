import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {Post} from '../post.model';
import {PostsService} from '../posts.service';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
  posts: Post[] = [];
  totalPost = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {
  }

  ngOnInit() {
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener()
    // @ts-ignore
      .subscribe((postData: {posts: Post[], postCount: number}) => {
        this.posts = postData.posts;
        this.totalPost = postData.postCount;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  onDelete(post: string) {
    this.postsService.deletePost(post).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }
}
