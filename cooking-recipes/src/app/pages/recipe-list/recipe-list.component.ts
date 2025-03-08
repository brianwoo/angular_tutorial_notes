import { Component, inject, OnInit } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { Recipe } from '../../models/recipes';
import { tap } from 'rxjs';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeCardComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit {

  recipesService = inject(RecipesService);
  recipes: Recipe[] | undefined = undefined;

  ngOnInit(): void {
    this.recipesService.getRecipes()
      .pipe(
        tap((recipes) => console.log(recipes))
      )
      .subscribe((recipesObj) => this.recipes = recipesObj.recipes);
  }


}
