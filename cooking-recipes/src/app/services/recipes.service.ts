import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe, Recipes } from '../models/recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  http = inject(HttpClient);

  constructor() { }

  getRecipes(): Observable<Recipes> {
    return this.http.get<Recipes>('https://dummyjson.com/recipes?select=name,image,tags,prepTimeMinutes,cookTimeMinutes,servings');
  }


  getRecipe(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`https://dummyjson.com/recipes/${id}`);
  }
}
