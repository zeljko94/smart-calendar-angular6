import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwalService } from '../../../services/swal.service';
import { ForumService } from '../../../services/forum.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-ucenik-forum',
  templateUrl: './ucenik-forum.component.html',
  styles: []
})
export class UcenikForumComponent implements OnInit {

  constructor(
    private router: Router,
    private swal: SwalService,
    private forumService: ForumService,
    private auth: AuthService
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
    this.router.navigate(['/ucenik/forum-details/' + id]);
  }

}
