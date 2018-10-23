import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TerminFilesService } from '../../../services/rest/termin-files.service';
import { TerminDetaljiService } from '../../../services/rest/termin-detalji.service';
import { SwalService } from '../../../services/swal.service';

@Component({
  selector: 'app-admin-termin-details',
  templateUrl: './admin-termin-details.component.html'
})
export class AdminTerminDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('usrDocInput') usrDocInput;

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

  spremi(){
    this.terminDetalji.TerminNastavaID = this.id;
    
    this.terminDetaljiService.update(this.terminDetalji)
      .subscribe(data => {
        

        this.terminFilesService.insert(this.id, this.MaterijaliDocs.map(d => d.File))
          .subscribe(data => {
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

  materijalDocAdd(){
    var files = this.usrDocInput.nativeElement.files;
    for(var i=0; i<files.length; i++){
      this.MaterijaliDocs.push({FileName: files[i].name, File: files[i]});
    }
  }


  removeDoc(doc){
    this.MaterijaliDocs = this.MaterijaliDocs.filter(pd => pd != doc);
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
