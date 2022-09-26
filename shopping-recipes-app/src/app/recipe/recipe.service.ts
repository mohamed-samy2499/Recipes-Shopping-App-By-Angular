import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

export class RecipeService{
    private recipes:Recipe[] = [new Recipe('A test recipe 1',
    'A delecious negrsko macroni',
    'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F8963973.jpg',
    [new Ingredient('tomato',2), 
    new Ingredient('meat',1)]),
    new Recipe('A test recipe 2',
    'A mushroom pizza',
    'https://www.simplyrecipes.com/thmb/mbN8mXZ0srgAT1YrDU61183t0uM=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1b-ea13798d224048b3a28afb0936c9b645.jpg',
    [new Ingredient('musroom',2), 
    new Ingredient('olive oil',3)])];


  getRecipes(){
    return this.recipes.slice();
  }

    recipeEmitted = new EventEmitter<Recipe>();
    recipeSerlected = new EventEmitter<Recipe>();
}