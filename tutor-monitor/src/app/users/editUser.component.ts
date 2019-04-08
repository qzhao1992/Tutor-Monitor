import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import {FormsModule} from '@angular/forms';
// var _ = require('lodash');

import * as _ from 'lodash';  
// var _ = require('lodash.clone');

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: 'editUser.html',
  })

export class EditUserModalContent {
    @Input() user;
    userRef: any;
    db : any;
    newUser: any = {}
    
    
    usersRef: AngularFirestoreCollection;
    private itemDoc: AngularFirestoreDocument;

    constructor(
        public activeModal: NgbActiveModal,
        firebase: AngularFireDatabase
        ) {
            
            this.db = firebase;
        }

    ngOnInit() {
        this.newUser = _.cloneDeep(this.user);
        console.log("new User", this.user);
    }


    update(user){
        this.userRef = this.db.object('users/' + user._key);
        // user.price = parseFloat(item.price)
        // this.userRef.update(item).then((item) =>{
        //     this.activeModal.close('Saved')
        // })
    }

    

}
  