import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  
  constructor(private authService:AuthService, private router:Router) { }

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
        this.router.navigate(['/recipes']);
        
      },
      error: (errorMsg)=>{
        this.isLoading = false;
        this.error = errorMsg;

      }
    })
    form.reset();
  }
  onCloseError(){
    this.error = null;
  }
  
}
