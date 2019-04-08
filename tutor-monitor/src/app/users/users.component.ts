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

    



    // firebase.list('users').snapshotChanges().pipe(map(users => {
    //   return users.map(user => {
    //     let data = user.payload.val();
    //     data["_key"] = user.payload.key
    //     return data
    //   })
    // }))
    //   .subscribe((users) => {
    //     if (users) {
    //       this.users = users
    //     }
    //   })
  }

  openAddModal() {
    const modalRef = this.modalService.open(AddUserModalContent);
    // modalRef.componentInstance.item = item;  
  }

  openEdit(user) {
    console.log("edit", user);
    const modalRef = this.modalService.open(EditUserModalContent);
    modalRef.componentInstance.user = user;
  }

  deleteItem(item){
    const itemsRef = this.db.list('items' );
    itemsRef.remove(item._key);
  }

  // open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }




}

interface Item {
  name: string;
  price: string;
}

