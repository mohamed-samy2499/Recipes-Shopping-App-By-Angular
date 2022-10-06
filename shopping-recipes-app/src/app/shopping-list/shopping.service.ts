import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingService{
    private ingredients:Ingredient[] = [new Ingredient('onion',3),
    new Ingredient('Apples',5)];
    elementAdded = new Subject<Ingredient[]>();
    startEditting = new Subject<number>();
    getIngredients()
    {
        return this.ingredients.slice();
    }
    getIngredient(index:number){
        return this.ingredients[index];
    }
    addElementToShopping(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.elementAdded.next(this.ingredients.slice());
    }
    addIngredients(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
        this.elementAdded.next(this.ingredients.slice());
    }
    replaceIngredient(item:Ingredient,id:number){
        this.ingredients[id] = item;
        this.elementAdded.next(this.ingredients.slice());
    }
}