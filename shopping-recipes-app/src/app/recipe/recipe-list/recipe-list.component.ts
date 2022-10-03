import { Component, Input, OnInit, Output ,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  constructor(private recipeService:RecipeService, private router:Router,private route:ActivatedRoute) { }
  recipes: Recipe[] = []

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipeAdded.subscribe(
      (recipes:Recipe[]) => this.recipes = recipes
    )
  }

  onAddRecipe(){
    this.router.navigate(['add'],{relativeTo:this.route})
  }
}
