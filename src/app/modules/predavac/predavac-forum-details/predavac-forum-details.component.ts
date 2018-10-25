import { Component, OnInit } from '@angular/core';
import { SwalService } from '../../../services/swal.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/rest/user.service';
import { ForumService } from '../../../services/forum.service';
import { SanitizerService } from '../../../services/sanitizer.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-predavac-forum-details',
  templateUrl: './predavac-forum-details.component.html',
  styles: []
})
export class PredavacForumDetailsComponent implements OnInit {


  forum: any = {};
  id: any;
  isLoaded: boolean = false;
  comment: any = {};
  loggedID: any = 0;
  isAdmin: boolean = false;

  private sub: any;

  constructor(
    private swal: SwalService,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private notificationService: NotificationService,
    private userService: UserService,
    private forumService: ForumService,
    private sanitizer: SanitizerService
  ) { }

  ngOnInit() {
    this.loggedID = this.auth.getID();
    this.isAdmin = this.auth.isAdmin();
    this.swal.showLoading("Učitavanje...", false);
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      if(this.id){
        this.forumService.getById(this.id)
          .subscribe(data => {
            this.swal.hideLoading();
            this.isLoaded = true;
            this.forum = data.Data;
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
