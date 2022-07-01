import { Component } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
@Component({
    selector:'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent
{
    ingredients:Ingredient[] = [
        new Ingredient('onion',3),
        new Ingredient('Apples',5)
    ];
    elementAdded(item:Ingredient)
    {
        this.ingredients.push(item);
    }
}