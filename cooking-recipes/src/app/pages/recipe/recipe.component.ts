import { Component, inject, OnInit } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { tap } from 'rxjs';
import { Recipe } from '../../models/recipes';
import { ActivatedRoute } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';


/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-recipe',
  imports: [MatListModule, MatCardModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent implements OnInit {

  recipesService = inject(RecipesService);
  recipe: Recipe | undefined = undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.recipesService.getRecipe(id)
        .pipe(
          tap((recipe) => console.log(recipe))
        )
        .subscribe((recipe) => this.recipe = recipe);
    });
  }



}
