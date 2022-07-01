import { Component, OnInit,Input, Output ,EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() listElement = new Recipe();
  @Output() elementPicked = new EventEmitter<Recipe>();
  constructor() { }

  ngOnInit(): void {
  }
  onItemChoosed(){
    this.elementPicked.emit(this.listElement);
  }

}
