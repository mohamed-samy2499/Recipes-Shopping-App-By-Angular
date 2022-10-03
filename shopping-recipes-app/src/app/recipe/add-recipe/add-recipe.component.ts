import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Ingredient } from "src/app/shared/ingredient.model";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
    selector: 'app-add-Recipe',
    templateUrl: './add-recipe.component.html',
    styleUrls: ['./add-recipe.component.css']
})

export class AddRecipeComponent implements OnInit{
    Id:number | undefined;
    editMode:boolean = false;
    recipe:Recipe | undefined;
    name:string |undefined;
    description:string |undefined;

    imgPath:string |undefined;
    Ingredient:string |undefined;

    constructor(private recipeService:RecipeService, private route:ActivatedRoute){}
    ngOnInit() {
        this.route.params.subscribe(
            (params:Params)=>{
                this.Id = +params['id'];
                this.editMode = params['id'] != null;
                // console.log(this.editMode);
                this.recipe = this.recipeService.getRecipeById(this.Id);
                this.name = this.recipe.name;
                this.description = this.recipe.description;
                this.imgPath = this.recipe.imagePath;
            }
        )
    }
    onAdd(name:any, desc:any, imgPath:any, ingredients:any){
        let ingArray = ingredients.split(' ') ;
        let ingredient = new Ingredient(ingArray[0],+ingArray[1]);

        let recipe = new Recipe(name,desc,imgPath,[ingredient]);
        this.recipeService.addRecipe(recipe);
    }
}