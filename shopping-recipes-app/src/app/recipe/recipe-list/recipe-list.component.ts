import { Component, Input, OnInit, Output ,EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  constructor(private recipeService:RecipeService, private router:Router,private route:ActivatedRoute) { }
  recipes: Recipe[] = []
  private raSub:Subscription|undefined;
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.raSub = this.recipeService.recipeAdded.subscribe(
      (recipes:Recipe[]) => this.recipes = recipes
    )
  }

  onAddRecipe(){
    this.router.navigate(['add'],{relativeTo:this.route})
  }
  ngOnDestroy(): void {
      this.raSub?.unsubscribe();
  }
}
