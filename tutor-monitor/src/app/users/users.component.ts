import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

//modal
import { EditUserModalContent } from './editUser.component';
import { AddUserModalContent } from './addUser.component';
import { DeleteUserModalContent } from './deleteUser.component';


@Component({
  selector: 'app-root',
  templateUrl: 'users.component.html',
})
export class UsersComponent {
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

  openAddModal() {
    const modalRef = this.modalService.open(AddUserModalContent);
    // modalRef.componentInstance.item = item;  
  }

  openEdit(user) {
    const modalRef = this.modalService.open(EditUserModalContent);
    modalRef.componentInstance.user = user;
  }

  openDelete(user) {
    const modalRef = this.modalService.open(DeleteUserModalContent);
    modalRef.componentInstance.user = user;
  }


  

}

interface Item {
  name: string;
  price: string;
}

