import { Component, ComponentFactory, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {

  @ViewChild(PlaceholderDirective,{static:true}) placeholder!:PlaceholderDirective;
  alertCompSub!:Subscription;
  isLoginMode = true;
  isLoading = false;
  error?: string | null;

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
        this.HandleError(errorMsg);
      }
    })
    form.reset();
  }
  HandleError(errorMsg:string){
    const viewContainerRef  = this.placeholder.viewContainerRef;
    viewContainerRef.clear();
    const alertCompRef = viewContainerRef.createComponent(AlertComponent);
    alertCompRef.instance.message = errorMsg;
    this.alertCompSub = alertCompRef.instance.close.subscribe(()=>{
      this.alertCompSub.unsubscribe();
      viewContainerRef.clear();

    })
     
  }
  onCloseError(){
    this.error = null;
  }
  ngOnDestroy(): void {
    if(this.alertCompSub)
      this.alertCompSub.unsubscribe();
  }
}
