import { Component, OnInit , Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from 'src/app/shopping-list/shopping.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

 element:Recipe = new Recipe();
  recipeId: number = -1;
  constructor(private shoppingService:ShoppingService,private route:ActivatedRoute, private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.recipeId = +this.route.snapshot.params['id'];
    this.element = this.recipeService.getRecipeById(this.recipeId);
    this.route.params.subscribe(
      (params:Params)=>{
        this.recipeId = +params['id'];
        this.element = this.recipeService.getRecipeById(this.recipeId);
      }
    )
  }
  anyElement()
  {

    if(this.element.name==='' && this.element.imagePath === '' && this.element.description === '')
      {
        return false;
      }
    return true;
  }

  onAddToShoppingList(ingredients:Ingredient[]){
    // for(let item of ingredients){

    //   this.shoppingService.addElementToShopping(item);
    // }
    this.shoppingService.addIngredients(ingredients);
  }
}
