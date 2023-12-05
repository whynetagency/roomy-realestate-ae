import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BlogItemComponent implements OnInit {
  isLoading = true;
  posts: any[] = [];
  activeItemId = this.activatedRoute.snapshot.params['id'];
  activeItem: any;
  first = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private db: AngularFirestore
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.activeItemId = this.activatedRoute.snapshot.params['id'];
        this.first ? this.first = false : this.getActivePost();
      });
  }

  ngOnInit(): void {
    this.db
      .collection('posts')
      .snapshotChanges()
      .subscribe((data) => {
        this.posts = data.map((e: any) => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          };
        });
        this.activeItem = this.posts.find((i) => i.id === this.activeItemId);
        this.isLoading = false;
      });
  }
  getActivePost() {
    this.isLoading = true;
    this.activeItem = this.posts.find((i) => i.id === this.activeItemId);
    setTimeout(() => {
      this.isLoading = false;
    }, 500)
  }
}
