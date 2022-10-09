import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

interface AuthResponseData {
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
                credentials).pipe(catchError(errorRes => {
                    let errorMsg = "An unknown error occurred!";
                    if (!errorRes.error || !errorRes.error.error) {
                        throw new Error(errorMsg);


                    }
                    switch (errorRes.error.error.message) {
                        case 'EMAIL_EXISTS':
                            errorMsg = "this email already exists!"
                    }
                    throw new Error(errorMsg);

                }));
    }
    signIn(email: string, password: string) {
        const credentials = { 'email': email, 'password': password, 'returnSecureToken': true };
        return this.http.post<AuthResponseData>
            ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.apiKey,
                credentials).pipe(catchError(errorRes => {
                    let errorMsg = "An unknown error occurred!";
                    if (!errorRes.error || !errorRes.error.error) {
                        throw new Error(errorMsg);

                    }
                    switch (errorRes.error.error.message) {
                        case 'EMAIL_NOT_FOUND':
                            errorMsg = "this user doesn't exists!"
                    }
                    throw new Error(errorMsg);

                }));
    }
}