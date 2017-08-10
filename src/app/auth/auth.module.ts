import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';

import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';

@NgModule({
  imports:      [ HttpModule ],
  declarations: [  ],
  providers:    [ AuthService, AuthGuardService ]
})

export class AuthModule { }