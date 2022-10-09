import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  // @ViewChild('authForm') authForm!:NgForm;
  isLoginMode = true;
  isLoading = false;
  
  error?: string | null;
  
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
    const email = form.value.email;
    const password = form.value.password;
    let registerObs: Observable<AuthResponseData>;
    if(this.isLoginMode){
      //...login 
      registerObs = this.authService.signIn(email,password);
    }
    else{

      //credentials
     
      //signUp post request
      registerObs =this.authService.signUp(email,password);
    }
    registerObs.subscribe({
      next: (Response)=>{
        this.isLoading = false;
        console.log(Response);

        
      },
      error: (errorMsg)=>{
        this.isLoading = false;
        console.log(errorMsg);
        this.error = errorMsg;

      }
    })
    form.reset();
  }

  
}
