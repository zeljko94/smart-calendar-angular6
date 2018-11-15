import { Component, OnInit, OnDestroy } from '@angular/core';
import { SwalService } from '../../../services/swal.service';
import { AuthService } from '../../../services/auth.service';
import { SanitizerService } from '../../../services/sanitizer.service';
import { UserService } from '../../../services/rest/user.service';
import { ForumService } from '../../../services/forum.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { DualListComponent } from 'angular-dual-listbox';
import { UceniciService } from '../../../services/rest/ucenici.service';

@Component({
  selector: 'app-admin-forum-details',
  templateUrl: './admin-forum-details.component.html',
  styles: []
})
export class AdminForumDetailsComponent implements OnInit, OnDestroy {


  forum: any = {
    source: [],
    destination: []
  };
  id: any;
  isLoaded: boolean = false;
  comment: any = {};
  loggedID: any = 0;
  isAdmin: boolean = false;

  private sub: any;

  constructor(
    private swal: SwalService,
    private notificationService: NotificationService,
    private uceniciService: UceniciService,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private userService: UserService,
    private forumService: ForumService,
    private sanitizer: SanitizerService
  ) { }
  
  format = { add: 'Dodaj', remove: 'Ukloni', all: 'Označi sve', none: 'Poništi',
  direction: DualListComponent.LTR, draggable: true, locale: 'en' };


dualListDisplay(o){
return o.Name + " " + o.LastName  + " - " + o.ID;
}
   
destinationChange(ev){
  this.forum.SudioniciID = ev.map(e => e.ID);
}

save(){
  var o = JSON.parse(JSON.stringify(this.forum));
  delete o["source"];
  delete o["destination"];
  delete o["Posts"];
  delete o["Sudionici"];
  o["KreatorID"] = o.Kreator.ID;
  delete o["Kreator"];
  o.SudioniciID = this.forum.Sudionici.map(s => s.ID).toString();
  this.forum.SudioniciID = o.SudioniciID;
  this.forumService.update(o)
    .subscribe(data => {
      if(this.swal.handleResponse(data)){
        
      }
    });
}


  ngOnInit() {
    this.loggedID = this.auth.getID();
    this.isAdmin = this.auth.isAdmin();
    this.swal.showLoading("Učitavanje...", false);
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      if(this.id){
        this.forumService.getById(this.id)
          .subscribe(data => {
            this.uceniciService.getAll()
              .subscribe(data => {
                this.forum.source = data.Data;
              });
            this.swal.hideLoading();
            this.isLoaded = true;
            this.forum = data.Data;
            this.forum.destination = data.Data.Sudionici;
            this.sanitizer.usrProfileImg(this.forum.Kreator);
            for(var i=0; i<this.forum.Posts.length; i++){
              this.sanitizer.usrProfileImg(this.forum.Posts[i].Kreator);
            }
          });
      }
    });
  }

  brisiKomentar(id){
    this.swal.confirmDelete(
      () => {
        this.notificationService.notifyForumPostDelete(id, this.auth.getID())
          .subscribe(data => {});
          
        this.forumService.deletePost(id)
          .subscribe(data => {
            if(this.swal.handleResponse(data)){
              this.forum.Posts = this.forum.Posts.filter(fp => fp.ID != id);
            }
          });
      },
      () => {}
    );
  }

  dodaj(){
    this.comment.ForumID = this.id;
    this.comment.KreatorID = this.auth.getID();
    this.comment.Naslov = "";
    this.comment.Datum = new Date().toJSON();
    
    this.forumService.insertPost(this.comment)
      .subscribe(data => {
        if(this.swal.handleResponse(data)){
          this.sanitizer.usrProfileImg(data.Data.Kreator);
          this.forum.Posts.push(data.Data);
          this.comment = {};

          this.notificationService.notifyForumPostInsert(data.Data.ID, this.auth.getID())
            .subscribe(data => {});
        }
      });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
