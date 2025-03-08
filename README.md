# Angular Crash Course
https://www.youtube.com/watch?v=oUmVFHlwZsI


## ***Angular DevTools***
- [Angular DevTools](https://chromewebstore.google.com/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh?hl=en-US&pli=1)


## ***Creating a Component***
- Use Angular CLI to create a component / service
```bash
ng g c home

# put greeting component in the components dir
ng g components/greeting

# create a service
ng g service services/todos
```


## ***Data-binding***

### Signal
- Recommended way to use as variable
- Define a signal variable in the code. Use the signal variable in the html

```ts
export class HeaderComponent {
  title = signal('My First Angular App');
}

// html (signal is a function):
<nav>{{ title() }}</nav>
```

### Without Signal
```ts
export class HeaderComponent {
  title = 'My First Angular App';
}

// html:
<nav>{{ title }}</nav>
```

## ***Passing Data from Parent to Child Component***
- Passing data from HomeComponent -> GreetingComponent
- [] is used in HTML to reference a variable in CHILD's Javascript code
- E.g. app-greeting is the child. [message], on the left side of the =, is inside GreetingComponent
- E.g. homeMessage(), on the right side of the =, is defined in the PARENT.
```ts
// PARENT
export class HomeComponent {
  homeMessage = signal('hello world');
}

// home.component.html:
// With [], the string value needs to be in javascript
<app-greeting [message]="homeMessage()" message2="static message" />
```

```ts
// CHILD
export class GreetingComponent {
  // input is a readonly signal
  // 'Hello Hello' is a default value  
  message = input('Hello Hello');  
  message2 = input('Another msg');
}

// greeting.component.html:
<p>{{ message() }}</p>
<p>{{ message2() }}</p>

// Shows in browser:
// hello world
// static message
```

## ***Passing Data from Child to Parent Component***
- Use event listener + emitter
```html
<!-- todo-item.component.html (CHILD) -->
<input id="todo-{{todo().id}}" 
    type="checkbox" 
    [checked]="todo().completed" 
    (change)="this.todoClicked()" />
```

```ts
export class TodoItemComponent {

  todo = input.required<Todo>()
  todoToggled = output<Todo>();

  todoClicked() {
    this.todoToggled.emit(this.todo());
  }
}
```

```html
<!-- todos.component.html (PARENT) -->
<app-todo-item (todoToggled)="updateTodoItem($event)" [todo]="item" />
```

```ts
export class TodosComponent implements OnInit {

updateTodoItem(todoItem: Todo) {
    // .....
  }
}
```


## ***Event Listener***
- () is used in HTML to send an event to Javasript code
```ts
// home.component.html
<input type="text" (keyup)="keyUpHandler($event)">

export class HomeComponent {  
  keyUpHandler(event: KeyboardEvent) {
    console.log(`user pressed the ${event.key} key`);
  }
}
```

## ***2-way Databinding with ngModel***
- [()] - banana in a box
```ts
@Component({
  selector: 'app-two-way-binding-ngmodel',
  imports: [FormsModule],
})
export class TwoWayBindingNgModelComponent {
  inputValue = '';
}
```

```html
<!-- two-way-binding-ngmodel.component.html -->

<!-- With ngModel -->
<input [ngModel]="inputValue" (ngModelChange)="inputValue = $event" type="text" />
<!-- is equivalent to: -->
<input [(ngModel)]="inputValue" type="text" />

<div>Input Value: {{ inputValue }}</div>
```



## ***Routes & RouterLinks***
- app.routes.ts
```ts
export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        // Option 1
        component: HomeComponent,
    },
    {
        path: 'todos',
        pathMatch: 'full',
        // Option 2
        loadComponent: () => {
            return import('./todos/todos.component').then((m) => m.TodosComponent);
        }
    }
];
```

- routerLink is similar to **\<Link to="/xxx" \/\>** in React
```ts
// header.component.ts
@Component({
  imports: [RouterLink],
})

// header.component.html
<nav>
    <span routerLink="/">{{ title() }}</span>
    <ul>
        <li routerLink="/todos">Todos</li>
    </ul>
</nav>
```

## ***Angular Services***
- Angular services are used to encapsulate data
- Make HTTP calls
- Perform any task that is not related directly to data rendering
- Have @Injectable annotation
    - default is providedIn: 'root'
- To use this service only in a particular component:     
    - Set in Component: providers: [XxxService]
    - Remove the option in Service:  providedIn: 'root'

```ts
// todos.component.ts
export class TodosComponent implements OnInit {

  // To use the service
  todoService = inject(TodosService);
  todoItems = signal<Array<Todo>>([]);

  ngOnInit(): void {
    console.log(this.todoService.todoItems);
    this.todoItems.set(this.todoService.todoItems);
  }
}

// todos.component.html
@for (item of todoItems(); track item.id) {
  <p>{{ item.title }}</p>
}
```

## ***HTTP calls***
```ts
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),  // import the HttpClient
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
```

```ts
// todos.service.ts
export class TodosService {

  http = inject(HttpClient);

  getTodosFromApi(): Observable<Todo[]> {
    const url = `https://jsonplaceholder.typicode.com/todos`;
    return this.http.get<Array<Todo>>(url);
  }
}
```

```ts
// todos.component.ts
export class TodosComponent implements OnInit {

  todoService = inject(TodosService);
  todoItems = signal<Array<Todo>>([]);

  ngOnInit(): void {
    this.todoService.getTodosFromApi()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((todos) => this.todoItems.set(todos));
  }
}
```


## ***Angular Directives***
- Directives allow you to add additional behavior to elements in an Angular application
    - Component
    - Attribute directives (e.g. ngClass, ngStyle, ngModel)
    - Structural directives (e.g. ngIf, ngFor)

```html
<!-- an older way to do ngIf, need to import ngIf in JS file -->
<p *ngIf="!todoItems().length">Loading...</p>

<!-- a new way to do if -->
@if (!todoItems().length) {
    <p>Loading...</p>
}

<!-- for loop directive -->
 <ul class="todos">
    @for (item of todoItems(); track item.id) {
    <app-todo-item (todoToggled)="updateTodoItem($event)" [todo]="item" />
    }
</ul>
```

```bash
# Custom Directive:
ng g directive directives/my-directive

# Example in directives/highlight-completed-todo.directive.ts
```

## ***Angular Pipes***
- Transform data

```ts
imports: [UpperCasePipe],
```

```html
<label for="todo-{{todo().id}}">{{ todo().title | uppercase }}</label>
```

```bash
# Custom Pipe:
ng g pipe pipes/filter-todos

# Example in pipes/filter-todos.pipe.ts
```