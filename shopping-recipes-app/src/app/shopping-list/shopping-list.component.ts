import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "./shopping.service";
@Component({
    selector:'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
    
})

export class ShoppingListComponent implements OnInit, OnDestroy
{
    ingredients:Ingredient[] = [];
    private eASub: Subscription|undefined;
    constructor(private shoppingService:ShoppingService){
        

    }

    ngOnInit() {
        this.ingredients = this.shoppingService.getIngredients();
        this.eASub = this.shoppingService.elementAdded.subscribe(
            (items:Ingredient[])=> this.ingredients = items
        );
    }
    ngOnDestroy(): void {
        this.eASub?.unsubscribe();
    }
    onEdit(index:number){
        this.shoppingService.startEditting.next(index);
    }
}