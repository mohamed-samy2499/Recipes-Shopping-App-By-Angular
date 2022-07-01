import { Component, Output , EventEmitter } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";

@Component({
    selector:'app-shopping-list-edit',
    templateUrl: './shopping-list-edit.component.html',
    styleUrls: ['./shopping-list-edit.component.html']

})

export class ShoppingListEditComponent{
    element:Ingredient|undefined;
    @Output() itemAdded = new EventEmitter<Ingredient>();
    onAdd(title:HTMLInputElement,quantity:HTMLInputElement)
    {
        this.element = new Ingredient(title.value,Number(quantity.value));
        this.itemAdded.emit(this.element);
    }
}