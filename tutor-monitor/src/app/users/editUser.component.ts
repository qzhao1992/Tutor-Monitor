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
    @Input() item;
    itemRef: any;
    db : any;
    newItem: any = {}
    
    
    itemsRef: AngularFirestoreCollection;
    private itemDoc: AngularFirestoreDocument;

    constructor(
        public activeModal: NgbActiveModal,
        firebase: AngularFireDatabase
        ) {
            
            this.db = firebase;
        }

    ngOnInit() {
        this.newItem = _.cloneDeep(this.item);
        // console.log("new item", this.item);
    }


    update(item){
        this.itemRef = this.db.object('items/' + item._key);
        item.price = parseFloat(item.price)
        this.itemRef.update(item).then((item) =>{
            this.activeModal.close('Saved')
        })
    }

    

}
  