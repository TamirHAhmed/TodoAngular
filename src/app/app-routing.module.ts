import { NgModule }             from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';


import { ForbiddenComponent } from './forbidden.component';
import { DashboardComponent }   from './dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'todos', loadChildren: 'app/todo/todo.module#TodoModule' },
  { path: '**', redirectTo: 'forbidden' }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}