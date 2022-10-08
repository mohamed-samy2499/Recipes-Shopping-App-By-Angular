import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipe/recipe.service";
import { map } from 'rxjs/operators';
import { Recipe } from "../recipe/recipe.model";
import { Ingredient } from "./ingredient.model";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http:HttpClient ,private recipeService:RecipeService){     
    }
    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put("https://ng-shopping-app-66d3d-default-rtdb.europe-west1.firebasedatabase.app/recipes.json",
        recipes).subscribe( response => {
            console.log(response);
            
        });
    }
    fetchRecipes(){
        this.http.get<Recipe[]>("https://ng-shopping-app-66d3d-default-rtdb.europe-west1.firebasedatabase.app/recipes.json")
        .pipe(map(resData => {
            return resData.map(recipe =>{
                //protection against if the recipe had no ingredients so that the server doesn't set it to undefined
                return {...recipe, ingredients: recipe.ingredients? recipe.ingredients : []};
        
            });
        }))
        .subscribe(resData=>{
            console.log(resData);
            
            this.recipeService.updateRecipes(resData);
          });
    }
}