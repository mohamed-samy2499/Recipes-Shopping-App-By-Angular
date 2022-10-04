import { Component, Input } from '@angular/core';
import { ShoppingService } from './shopping-list/shopping.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ShoppingService]
})
export class AppComponent {
  title = 'shopping-recipes-app';
  recipe = true;
}
