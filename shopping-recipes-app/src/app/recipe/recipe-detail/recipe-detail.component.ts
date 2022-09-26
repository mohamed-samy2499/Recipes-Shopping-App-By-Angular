import { Component, OnInit , Input } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from 'src/app/shopping-list/shopping.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() element:Recipe = new Recipe();
  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {
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
