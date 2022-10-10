import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService:AuthService){
        
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // return next.handle(req);
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                
                if(req.url != "https://ng-shopping-app-66d3d-default-rtdb.europe-west1.firebasedatabase.app/recipes.json"){
                    
                    return next.handle(req);
                }
                
                const modifiedReq = req.clone({params:new HttpParams().set('auth',user!.token!)});
                return next.handle(modifiedReq);
            }) )
    }

}