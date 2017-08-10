import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'forbidden',
  template: `
  <div class="container">
    <h2 class="text-dange">You don't have access to this page</h2>
    <br />
    <div (click)="navigateHome()" class="btn btn-primary">go to home</div>
  </div>
  `
})

export class ForbiddenComponent {

    constructor(private router:Router){}

    navigateHome(){
        this.router.navigate(['/dashboard']);
    }

}
