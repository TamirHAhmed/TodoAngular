import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AuthService } from '../auth/auth.service';
import { Todo } from './todo';
import { API_URL } from '../constants';

@Injectable()
export class TodoService {
  private todosUrl = `${API_URL}/api/Todo`; // URL to web api
  private headers: Headers; // = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private authService: AuthService) {}

  getTodos(): Promise<Todo[]> {
    this.headers = this.authService.setHeaders();
    let options = new RequestOptions({ headers: this.headers});

    return this.http
      .get(this.todosUrl, options)
      .toPromise()
      .then(response => response.json() as Todo[])
      .catch(this.handleError);
  }

  getTodo(id: number): Promise<Todo> {
    const url = `${this.todosUrl}/${id}`;
     this.headers = this.authService.setHeaders();
    let options = new RequestOptions({ headers: this.headers});
    return this.http
      .get(url, options)
      .toPromise()
      .then(response => response.json() as Todo)
      .catch(this.handleError);
  }

  getId(): Promise<any> {
    const url = `${this.todosUrl}/GetInfo`;
    this.headers = this.authService.setHeaders();
    let options = new RequestOptions({ headers: this.headers});

    return this.http
      .get(url, options)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  create(name: string): Promise<Todo> {
    this.headers = this.authService.setHeaders();
    let todo: Todo = new Todo();
    todo.todoItem = name;
    todo.isDone = false;

    return this.http
      .post(this.todosUrl, JSON.stringify(todo), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Todo)
      .catch(this.handleError);
  }

  update(todo: Todo): Promise<Todo> {
    this.headers = this.authService.setHeaders();
    const url = `${this.todosUrl}/${todo.id}`;

    return this.http
      .put(url, JSON.stringify(todo), { headers: this.headers })
      .toPromise()
      .then(() => todo)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    this.headers = this.authService.setHeaders();
    const url = `${this.todosUrl}/${id}`;

    return this.http
      .delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
