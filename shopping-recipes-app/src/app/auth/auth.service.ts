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
    user = new BehaviorSubject<User | null>(null);
    private apiKey = "AIzaSyDgLHtQCQfNcDaPXFa6Yh1X3rC7_c23D0E";
    tokenExpirationTimer: any;
    constructor(private http: HttpClient,
        private router: Router) { }


    signUp(email: string, password: string) {
        const credentials = { 'email': email, 'password': password, 'returnSecureToken': true };
        return this.http.post<AuthResponseData>
            ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey,
                credentials).pipe(catchError(this.HandleError),
                    tap((response) => {
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
                + this.apiKey, credentials)
            .pipe(catchError(this.HandleError),
                tap((response) => {

                    this.HandleUserData(
                        response.email,
                        response.localId,
                        response.idToken,
                        +response.expiresIn
                    )
                }));
    }


    autoLogin() {


        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem("userData")!);
        if (!userData) {
            return;
        }
        const loadedUser = new User(userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate))
        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration =
                new Date(userData._tokenExpirationDate).getTime()
                - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }


    logout() {

        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }


    autoLogout(expirationDate: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDate);
    }

    private HandleError(errorRes: HttpErrorResponse) {

        let errorMsg = "An unknown error occurred!";
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(() => errorMsg);
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
        return throwError(() => errorMsg);
    }

    private HandleUserData(email: string, localId: string, idToken: string, expiresIn: number) {

        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email,
            localId,
            idToken,
            expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem("userData", JSON.stringify(user));
    }
}