import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this.authService.IsAuthorized()) {
      this.router.navigate(['forbidden']);
      return false;
    }
    return true;
  }
}