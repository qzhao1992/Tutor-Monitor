import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import * as moment from 'moment';

import { EditStudentModalContent } from './editStudent.component';


//modal

@Component({
  selector: 'app-root',
  templateUrl: 'students.component.html',
})
export class StudentsComponent {
  users: any = [];
  closeResult: string;
  db : any;
  user: any = {};

  constructor(
    firebase: AngularFirestore,
    private service: AuthService,

    private modalService: NgbModal
  ) {
    this.db = firebase;
    this.user = JSON.parse(localStorage.getItem('user'))
    console.log("service ", this.user.email);
    this.users = this.db.collection('users', ref => ref.where('email', '==', this.user.email)).snapshotChanges().pipe(map((users:any) => users.map(a =>{
      let data = a.payload.doc.data();
      data["id"] =a.payload.doc.id;
      return data;
    }))).subscribe((users) =>{

      //testing
      console.log("subscribe users: ",users);

      this.users = users;
    });
  }

  getDAteFormat(timestamp){
    return moment(timestamp).format("MM-DD-YYYY, h:mm:ss a")
  }

  openEdit(user) {
    const modalRef = this.modalService.open(EditStudentModalContent);
    modalRef.componentInstance.user = user;
  }


}


