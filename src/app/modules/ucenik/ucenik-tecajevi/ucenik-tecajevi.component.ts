import { Component, OnInit } from '@angular/core';
import { TecajeviService } from '../../../services/rest/tecajevi.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ucenik-tecajevi',
  templateUrl: './ucenik-tecajevi.component.html',
  styles: []
})
export class UcenikTecajeviComponent implements OnInit {

  tecajevi: any[] = [];

  constructor(
    private tecajeviService: TecajeviService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.tecajeviService.getForUcenik(this.auth.getID())
      .subscribe(data => {
        this.tecajevi = data.Data;
      });
  }

  detalji(id){
    this.router.navigate(['/ucenik/tecaj-details/' + id]);
  }

}
