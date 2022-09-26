import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  providers:[RecipeService]
})
export class RecipeComponent implements OnInit {

  selectedElement = new Recipe();
  constructor(private recipeService:RecipeService) { 
  

  }

  ngOnInit(): void {
    this.recipeService.recipeSerlected.subscribe(
      (recipe:Recipe)=> this.selectedElement = recipe
    );
  }


}
