import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface AuthResponseData{
    "idToken":string,"email":string,"refreshToken":string,
    "expiresIn":string,"localId":string
}
@Injectable({providedIn:'root'})

export class AuthService{
    private apiKey = "AIzaSyDgLHtQCQfNcDaPXFa6Yh1X3rC7_c23D0E";

    constructor(private http:HttpClient){}

    signUp(email:string,password:string){
        const credentials = {'email': email,'password': password,'returnSecureToken':true};
        return this.http.post<AuthResponseData>
        ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+this.apiKey,
        credentials);
    }
}