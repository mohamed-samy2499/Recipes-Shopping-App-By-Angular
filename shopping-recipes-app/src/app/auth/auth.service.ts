import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

export interface AuthResponseData {
    "idToken": string, "email": string, "refreshToken": string,
    "expiresIn": string, "localId": string, "registered"?: boolean
}
@Injectable({ providedIn: 'root' })

export class AuthService {
    private apiKey = "AIzaSyDgLHtQCQfNcDaPXFa6Yh1X3rC7_c23D0E";

    constructor(private http: HttpClient) { }


    signUp(email: string, password: string) {
        const credentials = { 'email': email, 'password': password, 'returnSecureToken': true };
        return this.http.post<AuthResponseData>
            ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey,
                credentials).pipe(catchError(this.HandleError));
    }


    signIn(email: string, password: string) {
        const credentials = { 'email': email, 'password': password, 'returnSecureToken': true };
        return this.http.post<AuthResponseData>
            ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
             + this.apiKey,credentials)
            .pipe(catchError(this.HandleError));
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
                    }
                        // throw new Error(errorMsg);
                        console.log(errorRes);
                    return throwError( ()=> errorMsg );
    }
}