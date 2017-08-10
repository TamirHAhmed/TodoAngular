import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from './todo';

@Component({
  selector: 'my-todos',
  templateUrl: './todo.component.html',
  styleUrls: [ './todo.component.css' ]
})

export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  todoName: string;

  constructor(private todoService: TodoService) { }

  async ngOnInit() {
    this.todos = await this.todoService.getTodos();
  }

  async createItem() {
    try {
      if(this.todoName.trim()) {
        let todo = await this.todoService.create(this.todoName);
        this.todoName = '';
        if(todo){
          //push todo to the list after being created
          //using unshift to add at index 0
          this.todos.unshift(todo);
      }
    }
    } catch (error) {
      console.log(error);
    }
  }

  switchState(item: Todo): void {
    item.isDone = !item.isDone;

    //update in database
    this.todoService.update(item);
  }

  async deleteItem(item: Todo) {
    try {
      //delete from database
      await this.todoService.delete(item.id);

      //filter from list
      this.todos = this.todos.filter(todo => todo !== item);
    } catch (error) {
      console.log(error);
    }
  }
}