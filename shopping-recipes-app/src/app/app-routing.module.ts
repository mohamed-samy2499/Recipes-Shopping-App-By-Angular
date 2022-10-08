import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AddRecipeComponent } from './recipe/add-recipe/add-recipe.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipesResolverService } from './recipe/recipes-resolver.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
  {path:'',redirectTo:'recipes',pathMatch: 'full'},
  {path:'recipes',component:RecipeComponent,
  children:[
    {path:'',component:RecipeStartComponent},
    {path:'add',component:AddRecipeComponent},
    {path:':id',component:RecipeDetailComponent,resolve:[RecipesResolverService]},
    {path:':id/edit', component:AddRecipeComponent,resolve:[RecipesResolverService]}
  ]},
  {path:'shopping',component:ShoppingListComponent},
  {path:'auth',component:AuthComponent}
];

@NgModule({
  imports :[RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
