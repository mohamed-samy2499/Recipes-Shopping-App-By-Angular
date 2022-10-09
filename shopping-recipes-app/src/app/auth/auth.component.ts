import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  // @ViewChild('authForm') authForm!:NgForm;
  isLoginMode = true;
  isLoading = false;
  private token = "";
  private userId = "";
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }
  onSwitchMode(){
    this.isLoginMode = ! this.isLoginMode;
  }
  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    }
    this.isLoading = true;
    if(this.isLoginMode){
      //...login 
    }
    else{

      //credentials
      const email = form.value.email;
      const password = form.value.password;
      //signUp post request
      this.authService.signUp(email,password).subscribe({
        next: (Response)=>{
          this.isLoading = false;
          console.log(Response);
        },
        error: (error) => {
          this.isLoading = false;
          console.log(error);
        }
      })
    }
    form.reset();
  }

  
}
