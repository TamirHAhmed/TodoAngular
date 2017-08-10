import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { TodoService } from './todo.service';
import { Todo } from './todo';

@Component({
  selector: 'todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: [ './todo-detail.component.css' ]
})

export class TodoDetailComponent implements OnInit {
  todo: Todo;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.todoService.getTodo(+params.get('id')))
      .subscribe(todo => this.todo = todo);
  }

  async save() {
     await this.todoService.update(this.todo);
     this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

}