import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Ingredient } from "src/app/shared/ingredient.model";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
    selector: 'app-add-Recipe',
    templateUrl: './add-recipe.component.html',
    styleUrls: ['./add-recipe.component.css']
})

export class AddRecipeComponent implements OnInit{
    Id!:number;
    editMode:boolean = false;
    recipe!:Recipe;
    name!:string;
    description!:string;
    imgPath!:string;
    Ingredient!:string;
    ingredients: Ingredient[] = [];
    addRecipeForm!:FormGroup; 
    
    constructor(private recipeService:RecipeService,
         private route:ActivatedRoute,
         private router:Router){}
    ngOnInit() {
        this.route.params.subscribe(
            (params:Params)=>{
                this.Id = +params['id'];
                this.editMode = params['id'] != null;
                this.initForm();
            }
        )
    }
    private initForm(){
        if(this.editMode){
            const recipeEdit = this.recipeService.getRecipeById(this.Id);
            this.name = recipeEdit.name;
            this.description = recipeEdit.description;
            this.imgPath = recipeEdit.imagePath;
            this.ingredients = recipeEdit.ingredients;
            this.addRecipeForm = new FormGroup({
                'name': new FormControl(this.name,Validators.required),
                'description': new FormControl(this.description,Validators.required),
                'imgPath': new FormControl(this.imgPath,Validators.required),
                'ingredients': new FormArray([])
            });
            if(recipeEdit['ingredients']){

                for(let item of this.ingredients){
                    (<FormArray>this.addRecipeForm.get('ingredients'))
                    .push(new FormGroup(
                        {
                            'name':new FormControl(item.name,Validators.required),
                            'amount':new FormControl(item.amount,[Validators.required
                                ,Validators.pattern(/^[1-9]+[0-9]*$/)])
                        }
                    ))
                }
            }
        }
        else{
            this.addRecipeForm = new FormGroup({
                'name': new FormControl(null,Validators.required),
                'description': new FormControl(null,Validators.required),
                'imgPath': new FormControl(null,Validators.required),
                'ingredients': new FormArray([])
            });
            
        }

    }
    onAddIngredient(){
        (<FormArray>this.addRecipeForm.get('ingredients'))
        .push(new FormGroup(
                {   
                    'name':new FormControl(null,Validators.required),
                    'amount':new FormControl(null,[Validators.required
                        ,Validators.pattern(/^[1-9]+[0-9]*$/)])
                }
            )
        )
        console.log(this.addRecipeForm.get('ingredients'));
        
    }
    getControlls(){
        return (this.addRecipeForm.get('ingredients') as FormArray).controls;
    }
    onSubmit(){
        for(let item of this.addRecipeForm.get('ingredients')!.value){

            this.ingredients.push( new Ingredient(item.name,item.amount));
        }
        this.recipe = new Recipe(this.addRecipeForm.get('name')!.value,
            this.addRecipeForm.get('description')!.value,
            this.addRecipeForm.get('imgPath')!.value,
            this.ingredients
        )
        if(this.editMode){
            this.recipeService.editRecipe(this.recipe,this.Id);
        }
        else{

            this.recipeService.addRecipe(this.recipe);
        }
        this.onCancel();
    }
    onCancel(){
        this.router.navigate(['../'],{relativeTo:this.route})
        this.editMode = false;
        this.addRecipeForm.reset();
    }
    onClear(){
        this.addRecipeForm.reset();
    }
}