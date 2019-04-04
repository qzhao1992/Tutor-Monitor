import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import {FormsModule} from '@angular/forms'

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: 'addUser.html',
  })

export class AddItemModalContent {
    itemRef: any;
    item: any = {};

    constructor(
        public activeModal: NgbActiveModal,
        db: AngularFireDatabase
        ) {
            this.itemRef = db.list('items');
        }


    add(item){
        console.log('modal', item)
        item.price = parseFloat(item.price)
        this.itemRef.push(item).then((item) =>{
            this.activeModal.close('Saved')
        })
    }

}
  