import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Recipe } from '../../models/recipes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  imports: [MatCardModule, MatButtonModule, MatChipsModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {

  @Input() recipe: Recipe | undefined = undefined;

  constructor(private router: Router) { }

  onRecipeClick(id: number) {
    console.log("recipe clicked: " + id);
    this.router.navigate(['/recipe', id])
  }

}
