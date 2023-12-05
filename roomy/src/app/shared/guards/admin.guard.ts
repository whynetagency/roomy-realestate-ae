import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!)
      : null;

    if (!user.isAdmin || !this.authService.isLoggedIn) {
      this.router.navigate(['home']).then();
    }
    return true;
  }
}
