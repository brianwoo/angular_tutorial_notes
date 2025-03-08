import { inject, Injectable } from '@angular/core';
import { Todo } from '../model/tydo.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  http = inject(HttpClient);

  getTodosFromApi(): Observable<Todo[]> {
    const url = `https://jsonplaceholder.typicode.com/todos`;
    return this.http.get<Array<Todo>>(url);
  }
}
