import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
    },
    {
        path: 'form',
        pathMatch: 'full',
        component: ReactiveFormComponent,
    },
    {
        path: 'todos',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./todos/todos.component').then((m) => m.TodosComponent);
        }
    }
];
