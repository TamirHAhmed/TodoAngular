import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'my-app',
  template: `
    <div class="container">
      <h1>{{title}}</h1>
      <button *ngIf="!IsAuthorized()" (click)="login()" class="btn btn-success">Login</button>
      <button *ngIf="IsAuthorized()" (click)="logoff()" class="btn btn-danger">Logout</button>
      <hr />
      <nav>
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/todos" routerLinkActive="active">Todos</a>
      </nav>
    </div>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  name = 'Angular';

  constructor(private authService: AuthService){}

  ngOnInit() {
    let item = sessionStorage.getItem('authorizationData');
    if (window.location.hash || (item && item !== 'undefined')) {
      if (window.location.hash) {
          this.authService.AuthorizedCallback();
      }
    }
  }

  login() {
        this.authService.Authorize();
    }

  logoff() {
    this.authService.Logoff();
  }

  IsAuthorized(): boolean {
    return this.authService.IsAuthorized();
  }
}
