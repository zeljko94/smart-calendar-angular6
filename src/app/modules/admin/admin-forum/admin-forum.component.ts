import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForumService } from '../../../services/forum.service';
import { SwalService } from '../../../services/swal.service';
import { NotificationService } from '../../../services/notification.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-forum',
  templateUrl: './admin-forum.component.html',
  styleUrls: ['./admin-forum.component.css']
})
export class AdminForumComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService,
    private notificationService: NotificationService,
    private swal: SwalService,
    private forumService: ForumService
  ) { }

  forumi: any[] = [];
  mode: any = '';
  object: any = {};

  ngOnInit() {
    this.swal.showLoading("Učitavanje...", false);
    this.forumService.getAll()
      .subscribe(data => {
        this.swal.hideLoading();
        this.forumi = data.Data;
      });
  }

  details(id){
    this.router.navigate(['/admin/forum-details/' + id]);
  }

  brisi(id){
    this.swal.confirmDelete(
      () => {
        
        this.notificationService.notifyForumDelete(id, this.auth.getID())
        .subscribe(data => {});

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
    this.router.navigate(['/admin/add-forum']);
  }

}
