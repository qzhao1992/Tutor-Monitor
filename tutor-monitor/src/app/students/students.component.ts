import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

//modal

@Component({
  selector: 'app-root',
  templateUrl: 'students.component.html',
})
export class StudentsComponent {
  users: any = [];
  closeResult: string;
  db : any;

  constructor(
    firebase: AngularFirestore,

    private modalService: NgbModal
  ) {
    this.db = firebase;
    this.users = this.db.collection('users').snapshotChanges().pipe(map((users:any) => users.map(a =>{
      let data = a.payload.doc.data();
      data["id"] =a.payload.doc.id;
      return data;
    }))).subscribe((users) =>{

      //testing
      console.log("subscribe users: ",users);

      this.users = users;
    });
  }

}


