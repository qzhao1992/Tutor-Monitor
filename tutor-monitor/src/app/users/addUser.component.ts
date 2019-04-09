import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import {FormsModule} from '@angular/forms'

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: 'addUser.html',
  })

export class AddUserModalContent {
    usersRef: any;
    user: any = {};

    constructor(
        public activeModal: NgbActiveModal,
        db: AngularFirestore
        ) {
            this.usersRef = db.collection('users');
        }


    add(user){
        console.log('modal', user)
        
        this.usersRef.add(user).then((user) =>{
            this.activeModal.close('Saved')
        })
    }

}
  