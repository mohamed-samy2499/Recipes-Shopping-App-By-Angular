import { Component, OnInit,Input, Output ,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() listElement = new Recipe();
  @Input() ElemntId :number = -1;


  constructor() { }

  ngOnInit(): void {
  }


}
