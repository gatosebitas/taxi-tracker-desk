import { Component } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  lat: number;
  lng: number;
  init = false;
  taxistas: Taxista[] = [];
  taxistas2: Taxista[] = [];
  historicos: Historico[]= [];
  siguiendoA: string = null;
  siguiendoNombre: string = null;

nestedPaths: Array<Array<LatLngLiteral>> = [
[
  {lat:-16.35648,lng: -71.56882},
  {lat:-16.35668,lng: -71.54762},
  {lat:-16.38891,lng: -71.5477},
  {lat:-16.38925,lng: -71.56863}
],[
  {lat:-16.38925,lng: -71.56863},
  {lat:-16.38891,lng: -71.5477},
  {lat:-16.39295,lng: -71.53863},
  {lat:-16.40806,lng: -71.54651},
  {lat:-16.40506,lng: -71.56828}
],[
  {lat:-16.39295,lng: -71.53863},
  {lat:-16.40134,lng: -71.5279},
  {lat:-16.41056,lng: -71.53075},
  {lat:-16.41122,lng: -71.54163},
  {lat:-16.40395,lng: -71.54441}

],[
  {lat:-16.3737,lng: -71.51273},
  {lat:-16.3735,lng: -71.49789},
  {lat:-16.38666,lng: -71.49759},
  {lat:-16.38644,lng: -71.5127}
],[
  {lat:-16.38658,lng: -71.50339},
  {lat:-16.38674,lng: -71.4877},
  {lat:-16.40291,lng: -71.48739},
  {lat:-16.40266,lng: -71.50318}
]];

  items: Observable<any[]>;
  constructor(db: AngularFirestore,
              public af:AngularFireDatabase
  ) {

    this.items = af.list('usuarios2').valueChanges();
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


        //Rellenando Historico
        db.collection('historico').valueChanges()
            .subscribe( ( data: Historico[] ) => {

              this.historicos = data;

            });

            //Usando LA RAMA USUAIOS2 DE FIREBASE


            af.list('usuarios2').valueChanges()
                .subscribe( ( data: Taxista[] ) => {

                  this.taxistas2 = data;
                  /*
                  if ( !this.init ) {
                    this.lat = data[0].lat;
                    this.lng = data[0].lng;
                    this.init = true;
                  }
                  */

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

interface LatLngLiteral {
  lat: number;
  lng: number;
}

interface Taxista {
 nombre: string;
  clave: string;
   lat: number;
  lng: number;
}

interface Historico {
    nombre:string;
    fecha: string;
    hora_partida:string;
    hora_llegada:string;
    lat_partida: number;
    lng_partida: number;
    lat_llegada: number;
    lng_llegada: number;

}
