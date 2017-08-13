import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { AuthGuardService as AuthGuard 
} from '../auth/auth-guard.service';


import { TodoComponent } from './todo.component';
import { TodoDetailComponent } from './todo-detail.component';

const routes: Routes = [
  { path: '', component: TodoComponent, canActivate: [AuthGuard]},
  { path: 'detail/:id', component: TodoDetailComponent,  canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TodoRoutingModule {}