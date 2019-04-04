import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

//modal
import { EditItemModalContent } from './editUser.component';
import { AddItemModalContent } from './addUser.component';


@Component({
  selector: 'app-root',
  templateUrl: 'users.component.html',
})
export class UsersComponent {
  items: any = [];
  closeResult: string;
  db : any;

  constructor(
    firebase: AngularFireDatabase,

    private modalService: NgbModal
  ) {
    this.db = firebase;

    firebase.list('items').snapshotChanges().pipe(map(items => {
      return items.map(item => {
        let data = item.payload.val();
        data["_key"] = item.payload.key
        return data
      })
    }))
      .subscribe((items) => {
        if (items) {
          this.items = items
        }
      })

    // this.items.subscribe((items) =>{
    //     if(items){
    //       this.items = items
    //       console.log("key", this.items)
    //     }

    // console.log("items", this.items);
    // // subscribe((items) =>{
    // //   console.log(items)
    // //   if(items){
    // //     this.items = items
    // //     console.log("key", this.items)
    // //   }
    // } )
  }

  openAddModal() {
    const modalRef = this.modalService.open(AddItemModalContent);
    // modalRef.componentInstance.item = item;  
  }

  openEdit(item) {
    console.log("edit", item);
    const modalRef = this.modalService.open(EditItemModalContent);
    modalRef.componentInstance.item = item;
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

