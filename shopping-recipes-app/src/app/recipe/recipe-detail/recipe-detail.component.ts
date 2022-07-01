import { Component, OnInit , Input } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() element:Recipe = new Recipe();
  constructor() { }

  ngOnInit(): void {
  }
  anyElement()
  {

    if(this.element.name==='' && this.element.imagePath === '' && this.element.description === '')
      {
        return false;
      }
    return true;
  }
}
