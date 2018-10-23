import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ucenik-testovi',
  templateUrl: './ucenik-testovi.component.html',
  styles: []
})
export class UcenikTestoviComponent implements OnInit {

  testovi: any[] = [];
  rezultatiTestova: any[] = [];

  constructor() { }

  ngOnInit() {
    this.testovi = [
      {
        Naziv: "Njemački jezik - Ulazni test",
        Opis: "Ulazni test iz njemačkog jezika za određivanje razine polaznika",
        Jezik: "<span class='flag-icon flag-icon-de'></span>&nbsp;Njemački jezik",
        Vrijeme: "30 min",
        BrojPitanja: 100
      },
      {
        Naziv: "Engleski jezik - Ulazni test",
        Opis: "Ulazni test iz engleskog jezika za određivanje razine polaznika",
        Jezik: "<span class='flag-icon flag-icon-gb'></span>&nbsp;Engleski jezik",
        Vrijeme: "30 min",
        BrojPitanja: 100
      },
      {
        Naziv: "Talijanski jezik - Ulazni test",
        Opis: "Ulazni test iz talijanskog jezika za određivanje razine polaznika",
        Jezik: "<span class='flag-icon flag-icon-it'></span>&nbsp;Talijanski jezik",
        Vrijeme: "30 min",
        BrojPitanja: 100
      },
      {
        Naziv: "Francuski jezik - Ulazni test",
        Opis: "Ulazni test iz francuskog jezika za određivanje razine polaznika",
        Jezik: "<span class='flag-icon flag-icon-fr'></span>&nbsp;Francuski jezik",
        Vrijeme: "30 min",
        BrojPitanja: 100
      },
    ];

    this.rezultatiTestova = [
      {
        Naziv: "Njemački jezik - Ulazni test",
        Vrijeme: "20 min",
        Bodovi: 80,
        Datum: "05.10.2018.",
        Jezik: "<span class='flag-icon flag-icon-de'></span>&nbsp;Njemački jezik"
      },
      {
        Naziv: "Njemački jezik - Ulazni test",
        Vrijeme: "16 min",
        Bodovi: 76,
        Datum: "05.10.2018.",
        Jezik: "<span class='flag-icon flag-icon-de'></span>&nbsp;Njemački jezik"
      },
      {
        Naziv: "Njemački jezik - Ulazni test",
        Vrijeme: "14 min",
        Bodovi: 54,
        Datum: "05.10.2018.",
        Jezik: "<span class='flag-icon flag-icon-de'></span>&nbsp;Njemački jezik"
      },
      {
        Naziv: "Talijanski jezik - Ulazni test",
        Vrijeme: "14 min",
        Bodovi: 44,
        Datum: "04.10.2018.",
        Jezik: "<span class='flag-icon flag-icon-it'></span>&nbsp;Talijanski jezik"
      },
    ];
  }

}
