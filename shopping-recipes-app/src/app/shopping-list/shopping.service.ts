import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingService{
    private ingredients:Ingredient[] = [new Ingredient('onion',3),
    new Ingredient('Apples',5)];
    elementAdded = new EventEmitter<Ingredient[]>();
    getIngredients()
    {
        return this.ingredients.slice();
    }
    addElementToShopping(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.elementAdded.emit(this.ingredients.slice());
    }
    addIngredients(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
        this.elementAdded.emit(this.ingredients.slice());

    }
}