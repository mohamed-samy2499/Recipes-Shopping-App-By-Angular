import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-recipes-app';
  recipe = true;

  routingChoice(recipeChoice:boolean)
  {
    if(recipeChoice == true)
    {
      this.recipe = true;
    }
    else
    {
      this.recipe = false;      
    }
  }

  recipeActive()
  {
    return this.recipe;
  }
  shoppingActive()
  {
    return !this.recipe;
  }
}
