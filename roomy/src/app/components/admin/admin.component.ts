import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {map} from 'rxjs/operators';
import {IUser} from "../../shared/models/user.model";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  uploadSuccess = false;
  isLoading = true;
  users: IUser[] = [];
  result: any;

  activeView = 'exams';
  selectedFile: File | undefined | any;
  navigation = [
    /*{ title: 'Users', view: 'users', img: 'settings', isVisible: true},*/
    { title: 'Экзамены', view: 'exams', img: 'settings', isVisible: true},
  ];

  constructor(
    public afs: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.onChangeView(this.activeView);
  }

  onChangeView(view: string): void {
    this.isLoading = true;
    this.activeView = view;
    if (view === 'users') {
      this.onGetUsers();
    }
  }

  onGetUsers(): void {
    this.afs
      .collection('users')
      .snapshotChanges()
      .pipe(map(j => j.map(i => i.payload.doc.data() as IUser)))
      .subscribe((resp: IUser[]) => {
        this.users.length = 0;
        this.users = resp;
        this.isLoading = false;
      });
  }

  onFileChanged(event: any): void {
    this.selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    // @ts-ignore
    fileReader.readAsText(this.selectedFile, 'UTF-8');
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        this.result = JSON.parse(fileReader.result);
      }
    };
    fileReader.onerror = (error) => {
      console.log(error);
    };
  }

  onRemoveFile(): void {
    this.result = null;
    this.selectedFile = null;
  }

  onUpload(type: string): void {
    if (type === 'posts') {
      this.result.forEach((product: any) => {
        this.afs
          .collection(type)
          .doc(product.id)
          .set(product)
          .then(() => {
            this.onRemoveFile();
            this.uploadSuccess = true;
            setTimeout(() => (this.uploadSuccess = false), 2000);
          });
      });
    } else {
      this.afs
        .collection(type)
        .doc(this.result.id)
        .set(this.result)
        .then(() => {
          this.onRemoveFile();
          this.uploadSuccess = true;
          setTimeout(() => this.uploadSuccess = false, 2000);
        });
    }
  }
}
