import { Routes } from '@angular/router';
import { RecipeListComponent } from './pages/recipe-list/recipe-list.component';
import { RecipeComponent } from './pages/recipe/recipe.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: RecipeListComponent,
    },
    {
        path: 'recipe/:id',
        pathMatch: 'full',
        component: RecipeComponent,
    }
];
