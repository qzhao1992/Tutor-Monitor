import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import {FormsModule} from '@angular/forms'

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: 'deleteUser.html',
  })

export class DeleteUserModalContent {
    @Input() user;
    userRef: any;
    db : any;
    
    
    // usersRef: AngularFirestoreCollection;
    private userDoc: AngularFirestoreDocument;

    constructor(
        public activeModal: NgbActiveModal,
        firebase: AngularFirestore
        ) {
            
            this.db = firebase;
        }

    ngOnInit() {
        
    }

    delete(){
        this.userDoc = this.db.doc('users/' + this.user.id).delete().then((data)=>{
                this.activeModal.close('Saved')
        })
    }

}
  