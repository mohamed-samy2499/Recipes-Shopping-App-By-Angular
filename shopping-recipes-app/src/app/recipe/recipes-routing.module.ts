import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AddRecipeComponent } from "./add-recipe/add-recipe.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeComponent } from "./recipe.component";
import { AuthGuard } from '../auth/auth.guard';
import { RecipesResolverService } from '../recipe/recipes-resolver.service';


const routes:Routes =[
    {path:'',component:RecipeComponent,
    canActivate:[AuthGuard],
    children:[
      {path:'',component:RecipeStartComponent},
      {path:'add',component:AddRecipeComponent},
      {path:':id',component:RecipeDetailComponent,resolve:[RecipesResolverService]},
      {path:':id/edit', component:AddRecipeComponent,resolve:[RecipesResolverService]}
    ]},
]

@NgModule({
    imports :[RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule{}