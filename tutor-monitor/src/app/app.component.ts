import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'admin';
  items: Observable<any[]>;
  constructor(db: AngularFirestore, private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.afAuth.authState
      .subscribe(user => {
        console.log(user);

      })
  }

}
