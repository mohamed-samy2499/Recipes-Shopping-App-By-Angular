import { Component, Input, OnInit, Output ,EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() elementEmitted = new EventEmitter<Recipe>();
  recipes:Recipe[] = [new Recipe('A test recipe 1','this is test description 1'
  ,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F8963973.jpg'),
  new Recipe('A test recipe 2','this is test description 2'
  ,'https://www.simplyrecipes.com/thmb/mbN8mXZ0srgAT1YrDU61183t0uM=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1b-ea13798d224048b3a28afb0936c9b645.jpg')];
  constructor() { }

  elementSelected(item:Recipe)
  {
    this.elementEmitted.emit(item);
  }
  ngOnInit(): void {
  }

}
