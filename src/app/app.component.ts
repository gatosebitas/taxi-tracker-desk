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
  {lat:-16.348032,lng: -71.558021},
  {lat:-16.299641,lng: -71.531083},
  {lat:-16.304926,lng: -71.516589},
  {lat:-16.342740,lng: -71.535158},
  {lat:-16.373690,lng: -71.534335},
  {lat:-16.392694,lng: -71.550054}
],[
  {lat:-16.411994,lng: -71.633908},
  {lat:-16.371201,lng: -71.642497},
  {lat:-16.307553,lng: -71.605427},
  {lat:-16.286108,lng: -71.543640},
  {lat:-16.299641,lng: -71.531083},
  {lat:-16.348032,lng: -71.558021},
  {lat:-16.389991,lng: -71.550537},
  {lat:-16.394849,lng: -71.568313},
  {lat:-16.404403,lng: -71.565560}
],[
  {lat:-16.404403,lng: -71.565560},
  {lat:-16.394849,lng: -71.568313},
  {lat:-16.389991,lng: -71.550537},
  {lat:-16.392694,lng: -71.550054},
  {lat:-16.373690,lng: -71.534335},
  {lat:-16.374674,lng: -71.533163},
  {lat:-16.393287,lng: -71.541229},
  {lat:-16.403539,lng: -71.552340},
  {lat:-16.406132,lng: -71.551599},
  {lat:-16.408982,lng: -71.558786}
],[
  {lat:-16.412834,lng: -71.554718},
  {lat:-16.406132,lng: -71.551599},
  {lat:-16.403539,lng: -71.552340},
  {lat:-16.393287,lng: -71.541229},
  {lat:-16.374674,lng: -71.533163},
  {lat:-16.376186,lng: -71.530093},
  {lat:-16.386693,lng: -71.533249},
  {lat:-16.389483,lng: -71.528299},
  {lat:-16.395065,lng: -71.527890},
  {lat:-16.403051,lng: -71.516346},
  {lat:-16.410565,lng: -71.513424},
  {lat:-16.410516,lng: -71.518852},
  {lat:-16.420418,lng: -71.538597},
  {lat:-16.428194,lng: -71.551548},
  {lat:-16.429707,lng: -71.560168},
  {lat:-16.432851,lng: -71.562961},
  {lat:-16.431326,lng: -71.564613},
  {lat:-16.416433,lng: -71.550817}
],[
  {lat:-16.437442,lng: -71.596726},
  {lat:-16.407974,lng: -71.597684},
  {lat:-16.404403,lng: -71.565560},
  {lat:-16.408982,lng: -71.558786},
  {lat:-16.406132,lng: -71.551599},
  {lat:-16.412834,lng: -71.554718},
  {lat:-16.416433,lng: -71.550817},
  {lat:-16.431326,lng: -71.564613},
  {lat:-16.445775,lng: -71.576366},
  {lat:-16.435466,lng: -71.588572}
],[
  {lat:-16.326361,lng: -71.527121},
  {lat:-16.366668,lng: -71.493454},
  {lat:-16.395065,lng: -71.527890},
  {lat:-16.389483,lng: -71.528299},
  {lat:-16.386693,lng: -71.533249},
  {lat:-16.376186,lng: -71.530093},
  {lat:-16.374674,lng: -71.533163},
  {lat:-16.373690,lng: -71.534335},
  {lat:-16.342740,lng: -71.535158}
],[
  {lat:-16.366668,lng: -71.493454},
  {lat:-16.369258,lng: -71.487237},
  {lat:-16.379717,lng: -71.487750},
  {lat:-16.384873,lng: -71.495179},
  {lat:-16.403051,lng: -71.516346},
  {lat:-16.395065,lng: -71.527890}
],[
  {lat:-16.384873,lng: -71.495179},
  {lat:-16.393516,lng: -71.479212},
  {lat:-16.401915,lng: -71.476979},
  {lat:-16.410811,lng: -71.506764},
  {lat:-16.410565,lng: -71.513424},
  {lat:-16.403051,lng: -71.516346}
],[
  {lat:-16.410565,lng: -71.513424},
  {lat:-16.410811,lng: -71.506764},
  {lat:-16.401915,lng: -71.476979},
  {lat:-16.405024,lng: -71.431269},
  {lat:-16.413980,lng: -71.441994},
  {lat:-16.428520,lng: -71.437945},
  {lat:-16.438763,lng: -71.419021},
  {lat:-16.439025,lng: -71.475545},
  {lat:-16.437874,lng: -71.488079},
  {lat:-16.446615,lng: -71.500807},
  {lat:-16.421064,lng: -71.516703}
],[
  {lat:-16.410565,lng: -71.513424},
  {lat:-16.421064,lng: -71.516703},
  {lat:-16.446615,lng: -71.500807},
  {lat:-16.456143,lng: -71.513826},
  {lat:-16.443453,lng: -71.522932},
  {lat:-16.430066,lng: -71.535314},
  {lat:-16.437517,lng: -71.543690},
  {lat:-16.428194,lng: -71.551548},
  {lat:-16.420418,lng: -71.538597},
  {lat:-16.410516,lng: -71.518852}
],[
  {lat:-16.455096,lng: -71.580370},
  {lat:-16.445775,lng: -71.576366},
  {lat:-16.431326,lng: -71.564613},
  {lat:-16.432851,lng: -71.562961},
  {lat:-16.429707,lng: -71.560168},
  {lat:-16.428194,lng: -71.551548},
  {lat:-16.437517,lng: -71.543690},
  {lat:-16.430066,lng: -71.535314},
  {lat:-16.443453,lng: -71.522932},
  {lat:-16.456143,lng: -71.513826},
  {lat:-16.464333,lng: -71.523356},
  {lat:-16.464174,lng: -71.549737},
  {lat:-16.464644,lng: -71.558224}
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