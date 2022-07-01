import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  selectedElement = new Recipe();
  constructor() { }

  ngOnInit(): void {
  }
  onElementChosed(e:Recipe)
  {
    this.selectedElement = e;    
  }
  onElementSelected(item:Recipe)
  {
    this.selectedElement = item;
  }
}
