import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Observable, ReplaySubject, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
    "idToken": string, "email": string, "refreshToken": string,
    "expiresIn": string, "localId": string, "registered"?: boolean
}
@Injectable({ providedIn: 'root' })

export class AuthService {
    isLoggedIn = false;
    user = new BehaviorSubject<User|null>(null);
    private apiKey = "AIzaSyDgLHtQCQfNcDaPXFa6Yh1X3rC7_c23D0E";
    tokenExpirationTimer:any;
    constructor(private http: HttpClient,
        private router:Router) { }


    signUp(email: string, password: string) {
        const credentials = { 'email': email, 'password': password, 'returnSecureToken': true };
        return this.http.post<AuthResponseData>
            ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey,
                credentials).pipe(catchError(this.HandleError),
                tap((response)=>{
                    this.HandleUserData(
                        response.email,
                        response.localId,
                        response.idToken,
                        +response.expiresIn
                    )
                }));
    }


    signIn(email: string, password: string) {
        const credentials = { 'email': email, 'password': password, 'returnSecureToken': true };
        return this.http.post<AuthResponseData>
            ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
             + this.apiKey,credentials)
            .pipe(catchError(this.HandleError),
            tap((response)=>{
                console.log(response);
                
                this.HandleUserData(
                    response.email,
                    response.localId,
                    response.idToken,
                    +response.expiresIn
                )
            }));
    }
    

    autoLogin(){
        this.isLoggedIn = false;

        const userData: {
        email:string,
        id:string,
        _token:string,
        _tokenExpirationDate:string}= JSON.parse(localStorage.getItem("userData")!);
        if(!userData){
            return;
        }
        const loadedUser = new User(userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate))
        if(loadedUser.token){
            this.user.next(loadedUser);
            this.isLoggedIn = true;
            const expirationDuration = 
            new Date(userData._tokenExpirationDate).getTime() 
            -  new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }
    

    logout(){
        this.isLoggedIn = false;
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }


    autoLogout(expirationDate:number){
        this.tokenExpirationTimer = setTimeout(()=>{
            this.logout();
        },expirationDate);
    }   


    isAuthenticated(){
        const promise = new Promise(
            (resolve,reject) => {
                resolve(this.isLoggedIn);
            }
        )
        return promise;
    }

    private HandleError(errorRes: HttpErrorResponse){
        this.isLoggedIn = false;
        let errorMsg = "An unknown error occurred!";
                    if (!errorRes.error || !errorRes.error.error) {
                        // throw new Error(errorMsg);
                        console.log(errorRes);
                        
                        return throwError( ()=> errorMsg );
                    }
                    switch (errorRes.error.error.message) {
                        case 'EMAIL_NOT_FOUND':
                            errorMsg = "this user doesn't exists!";
                            break;
                        case 'EMAIL_EXISTS':
                            errorMsg = "this user already exists!";
                            break;
                        case 'INVALID_PASSWORD':
                            errorMsg = "this password is invalid!";
                            break;
                    }
                        // throw new Error(errorMsg);
                        console.log(errorRes);
                    return throwError( ()=> errorMsg );
    }

    private HandleUserData(email:string,localId:string,idToken:string,expiresIn:number){
        console.log(expiresIn);
        this.isLoggedIn = false;
        
        const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
        const user = new User(email,
            localId,
            idToken,
            expirationDate);
        this.user.next(user);
        this.isLoggedIn = true;
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem("userData",JSON.stringify(user));
    }
}