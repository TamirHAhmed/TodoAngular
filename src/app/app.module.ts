import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { TodoModule } from './todo/todo.module'; //importing todo module
import { AuthModule } from './auth/auth.module'; //importing auth module

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { ForbiddenComponent } from './forbidden.component';

@NgModule({
 imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    TodoModule,
    AuthModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    ForbiddenComponent
  ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }