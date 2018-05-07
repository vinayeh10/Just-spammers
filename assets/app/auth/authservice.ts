import { Injectable } from "@angular/core";
import { Http,Headers,Response } from "@angular/http";
import 'rxjs/Rx'
import { User } from "./user.model";
import { Observable } from "rxjs/Observable";
import { ErrorService } from "../error/error.service";

@Injectable()
export class authService{
    constructor(private http:Http,public errorService:ErrorService){
    }

    signUp(user:User){
        const body = JSON.stringify(user);
        const headers = new Headers(
            {'content-type':'application/json'}
        )
        return this.http.post('http://localhost:5000/user',body,{headers:headers})
        .map((response:Response)=>response.json())
        .catch((error: Response) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    }

    signIn(user:User){
        const body = JSON.stringify(user);
        const headers = new Headers(
            {'content-type':'application/json'}
        )
        return this.http.post('http://localhost:5000/user/signin',body,{headers:headers})
        .map((response:Response)=>response.json())
        .catch((error: Response) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    }

    logout(){
        localStorage.clear();
    }

    isLoggedIn(){
        return localStorage.getItem('token')!==null
    }
}