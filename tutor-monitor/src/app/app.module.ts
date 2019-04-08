import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { AuthComponent } from './auth/auth.component';

//modal
import { EditUserModalContent } from './users/editUser.component';
import { AddUserModalContent } from './users/addUser.component';



import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    AuthComponent,
    EditUserModalContent,
    AddUserModalContent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule ,
    AngularFireDatabaseModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    FormsModule
  ],
  entryComponents: [
    EditUserModalContent,
    AddUserModalContent
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    // ItemsComponent
  ]
})
export class AppModule { }
