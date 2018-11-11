import { Component } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  lat: number;
  lng: number;
  LatLngLiteral: any;
  init = false;

  taxistas: Taxista[] = [];
  siguiendoA: string = null;
  siguiendoNombre: string = null;
  paths: Array<LatLngLiteral> = [
   {lat: -16.3988900 , lng:-71.5350000},
   {lat:-16.3788910 , lng:-71.5450010},
   {lat:-16.3888920 , lng:-71.5550020},
   {lat:-16.3688930 , lng:-71.5650030}
];

  constructor(db: AngularFirestore) {
    db.collection('usuarios').valueChanges()
        .subscribe( ( data: Taxista[] ) => {

          this.taxistas = data;

          if ( !this.init ) {
            this.lat = data[0].lat;
            this.lng = data[0].lng;
            this.init = true;
          }

          if ( this.siguiendoA ) {

            data.forEach( taxista => {

              if ( taxista.clave === this.siguiendoA ) {
                this.lat = taxista.lat;
                this.lng = taxista.lng;
              }

            });

          }


        });
  }


  seguir( taxista: Taxista ) {
    
    this.siguiendoA = taxista.clave;
    this.siguiendoNombre = taxista.nombre;

    this.lat = taxista.lat;
    this.lng = taxista.lng;

  }

  dejarDeSeguir() {
    this.siguiendoA = null;
    this.siguiendoNombre = null;
  }

}



interface Taxista {
  nombre: string;
  clave: string;
  lat: number;
  lng: number;
}


