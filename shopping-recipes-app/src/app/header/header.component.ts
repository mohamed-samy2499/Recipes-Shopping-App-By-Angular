import { outputAst } from '@angular/compiler';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() recipeChoosed = new EventEmitter<boolean>();
  constructor() { }

  onRecipe()
  {
    this.recipeChoosed.emit(true);
  }


  onShopping()
  {
    this.recipeChoosed.emit(false);
  }

  ngOnInit(): void {
  }

}
