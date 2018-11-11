import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
<<<<<<< HEAD
      apiKey: 'AIzaSyAMj04e4JqwXUeInlhIErSEZ8_mnAUO-rU'
=======
      apiKey: 'AIzaSyBXX5MmV4i-ZKq69l4U7O_3y5WL4h73iwA'
>>>>>>> origin/master
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
