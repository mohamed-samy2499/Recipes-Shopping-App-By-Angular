import { Component, Output , EventEmitter, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { FormGroup, NgForm, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingService } from "../shopping.service";


@Component({
    selector:'app-shopping-list-edit',
    templateUrl: './shopping-list-edit.component.html',
    styleUrls: ['./shopping-list-edit.component.css']


})

export class ShoppingListEditComponent implements OnInit,OnDestroy{
    @ViewChild('form',{static:false}) signupForm!:NgForm;
    subscription!:Subscription;
    editMode:boolean = false;
    ingredient!:Ingredient;
    editIndex!:number;
    constructor(private shoppingService:ShoppingService){


    }
    // onAdd(title:HTMLInputElement,quantity:HTMLInputElement)
    // {
    //     this.shoppingService.addElementToShopping(new Ingredient(title.value,Number(quantity.value)));
    // }
    ngOnInit(): void {
        this.subscription = this.shoppingService.startEditting.subscribe(
            (index:number)=>{
                this.editIndex = index;
                this.editMode = true;
                this.ingredient = this.shoppingService.getIngredient(index);
                this.signupForm.setValue({
                    "foodname":this.ingredient.name,
                    "amount": this.ingredient.amount
                });
            }
        )
    }
    onSubmit(form: NgForm){
        const name = form.value.foodname;
        const amount = form.value.amount;
        if(!this.editMode){
            console.log("add mode");
            
            this.shoppingService.addElementToShopping(new Ingredient(name,amount));

        }
        else{
            console.log("edit mode");
            
            this.shoppingService.replaceIngredient(new Ingredient(name,amount), this.editIndex);
            
        }
        this.editMode=false;
        this.signupForm.reset();

    }
    onReset(){
        this.editMode=false;
        this.signupForm.reset();
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}