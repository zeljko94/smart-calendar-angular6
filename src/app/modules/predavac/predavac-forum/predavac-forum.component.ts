import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwalService } from '../../../services/swal.service';
import { ForumService } from '../../../services/forum.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-predavac-forum',
  templateUrl: './predavac-forum.component.html',
  styles: []
})
export class PredavacForumComponent implements OnInit {


  constructor(
    private router: Router,
    private auth: AuthService,
    private swal: SwalService,
    private forumService: ForumService
  ) { }

  forumi: any[] = [];
  mode: any = '';
  object: any = {};

  ngOnInit() {
    this.swal.showLoading("Učitavanje...", false);
    this.forumService.getForUser(this.auth.getID())
      .subscribe(data => {
        this.swal.hideLoading();
        this.forumi = data.Data;
      });
  }

  details(id){
    this.router.navigate(['/predavac/forum-details/' + id]);
  }

  brisi(id){
    this.swal.confirmDelete(
      () => {
        this.forumService.delete(id)
          .subscribe(data => {
            if(this.swal.handleResponse(data)){
              this.forumi = this.forumi.filter(f => f.ID != id);
            }
          });
      },
      () => {}
    );
  }

  dodaj(){
    this.router.navigate(['/predavac/add-forum']);
  }


}
