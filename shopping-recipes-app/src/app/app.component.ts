import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ShoppingService } from './shopping-list/shopping.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ShoppingService]
})
export class AppComponent implements OnInit{
constructor(private authService:AuthService){

}
  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
