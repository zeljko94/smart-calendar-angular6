import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PredavacAuthGuard implements CanActivate {
  constructor(private router: Router,
    private auth: AuthService) { }

canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  if(this.auth.isPredavac()){
    return true;
  }

  this.router.navigate(['/login']);
  return false;
  }
}
