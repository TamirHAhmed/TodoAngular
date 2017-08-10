import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { TodoComponent } from './todo.component';
import { TodoDetailComponent } from './todo-detail.component';
import { TodoService } from './todo.service';
import { TodoRoutingModule } from './todo-routing.module';

import { AuthModule } from '../auth/auth.module';

@NgModule({
  imports:      [ TodoRoutingModule, CommonModule, 
  FormsModule, AuthModule, HttpModule ],
  declarations: [ TodoComponent, TodoDetailComponent ],
  providers:    [ TodoService ]
})

export class TodoModule { }