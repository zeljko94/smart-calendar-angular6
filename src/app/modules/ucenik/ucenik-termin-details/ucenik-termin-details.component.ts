import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwalService } from '../../../services/swal.service';
import { TerminFilesService } from '../../../services/rest/termin-files.service';
import { TerminDetaljiService } from '../../../services/rest/termin-detalji.service';

@Component({
  selector: 'app-ucenik-termin-details',
  templateUrl: './ucenik-termin-details.component.html',
  styles: []
})
export class UcenikTerminDetailsComponent implements OnInit {
  MaterijaliDocs: any[] = [];
  terminDetalji: any = {};

  id: any = 0;
  private sub: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private swal: SwalService,
    private terminFilesService: TerminFilesService,
    private terminDetaljiService: TerminDetaljiService
  ) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];

      this.terminDetaljiService.getForTermin(this.id)
        .subscribe(data => {
          this.terminDetalji = data.Data ? data.Data : {};
        });

      this.terminFilesService.getForTermin(this.id)
        .subscribe(data => {
          this.MaterijaliDocs = data.Data;
        });

    });
  }


  subArray(arr, chunkSize){
    var i,j,temparray,chunk = chunkSize;
    var rez = [];
    for (i=0,j=arr.length; i<j; i+=chunk) {
        temparray = arr.slice(i,i+chunk);
        rez.push(temparray);
    }
    return rez;
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
