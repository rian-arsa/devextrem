import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { Change, PostService } from './post.service';
import { Post } from './post.model';
import { genres } from '../shared/genres';
import { Observable, Subscription } from 'rxjs';




@Component({
  selector: 'app-tab-one',
  templateUrl: './tab-one.component.html',
  styleUrls: ['./tab-one.component.css']
})
export class TabOneComponent {
  postSubscription!: Subscription
  posts$!: Observable<Post[]>

  changes: Change<Post>[] = [];

  editRowKey: number | any = null;

  isLoading = true;

  loadPanelPosition = { of: '#gridContainer' };

  genres = genres

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts()

    this.isLoading = true
    this.postSubscription = this.posts$.subscribe(() => {
      this.isLoading = false
    })
  }


  onSaving(e: any) {
    const change = e.changes[0]

    console.log(e);


    if (change) {
      e.cancel = true;
      e.promise = this.processSaving(change);
    }
  }

  async processSaving(change: Change<Post>) {
    this.isLoading = true;

    try {
      await this.postService.saveChange(change);
      this.editRowKey = null;
      this.changes = [];
      console.log("[BERHASIL]");

    } finally {
      this.isLoading = false;
    }
  }

  onDetailButton(e: any) {

    const id = e.data.id
    this.router.navigate([id], { relativeTo: this.route })
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

}

