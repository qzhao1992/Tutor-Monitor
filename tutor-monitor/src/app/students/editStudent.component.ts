import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {FormsModule} from '@angular/forms';
import * as _ from 'lodash';  

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: 'editStudent.component.html',
  })

export class EditStudentModalContent {
    @Input() user;
    isAddStart: boolean = false;
    isAddEnd: boolean = false;
    userRef: any;
    db : any;
    newUser: any = {}
    
    // usersRef: AngularFirestoreCollection;
    private userDoc: AngularFirestoreDocument;

    constructor(
        public activeModal: NgbActiveModal,
        firebase: AngularFirestore
        ) {            
            this.db = firebase;
        }

    ngOnInit() {
        this.newUser = _.cloneDeep(this.user);   
    }

    update(user){
        this.userDoc = this.db.doc('users/' + user.id).update(user).then((data)=>{
                this.activeModal.close('Saved')
        })
    }

    addStartSchedule(){
        this.isAddStart = true;
    }

    addEndSchedule(){
        this.isAddEnd = true;
    }

    finishedAddSchedule(){
        this.isAddStart = false;
        this.isAddEnd = false;
    }
}
  