import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IBlogItem } from '../../../shared/models/blog.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  isLoading = true;
  posts: IBlogItem[] = [];

  constructor(private db: AngularFirestore) {}

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
        this.isLoading = false;
      });
  }

  get isBlog(): boolean {
    return Object.keys(this.posts).length > 0;
  }
}
