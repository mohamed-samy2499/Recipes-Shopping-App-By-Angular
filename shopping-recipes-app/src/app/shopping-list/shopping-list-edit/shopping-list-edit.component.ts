import { Component, Output , EventEmitter } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingService } from "../shopping.service";


@Component({
    selector:'app-shopping-list-edit',
    templateUrl: './shopping-list-edit.component.html',
    styleUrls: ['./shopping-list-edit.component.css']


})

export class ShoppingListEditComponent{
    constructor(private shoppingService:ShoppingService){


    }
    // onAdd(title:HTMLInputElement,quantity:HTMLInputElement)
    // {
    //     this.shoppingService.addElementToShopping(new Ingredient(title.value,Number(quantity.value)));
    // }
    onSubmit(form: NgForm){
        const name = form.value.foodname;
        const amount = form.value.amount;
        this.shoppingService.addElementToShopping(new Ingredient(name,amount));
    }
}