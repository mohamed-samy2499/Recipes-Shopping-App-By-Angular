import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
    "idToken": string, "email": string, "refreshToken": string,
    "expiresIn": string, "localId": string, "registered"?: boolean
}
@Injectable({ providedIn: 'root' })

export class AuthService {
    user = new Subject<User>();
    private apiKey = "AIzaSyDgLHtQCQfNcDaPXFa6Yh1X3rC7_c23D0E";

    constructor(private http: HttpClient) { }


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
                this.HandleUserData(
                    response.email,
                    response.localId,
                    response.idToken,
                    +response.expiresIn
                )
            }));
    }


    private HandleError(errorRes: HttpErrorResponse){
        let errorMsg = "An unknown error occurred!";
                    if (!errorRes.error || !errorRes.error.error) {
                        // throw new Error(errorMsg);
                        
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
        const expirationDate = new Date(new Date().getTime() + expiresIn);
        const user = new User(email,
            localId,
            idToken,
            expirationDate);
        this.user.next(user);
    }
}