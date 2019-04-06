import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';




@Component({
  selector: 'app-root',
  templateUrl: 'auth.html',
})
export class AuthComponent {
  items: any = [];
  closeResult: string;
  db : any;

  constructor(
    firebase: AngularFireDatabase,

    private modalService: NgbModal
  ) {

    
  }
}

