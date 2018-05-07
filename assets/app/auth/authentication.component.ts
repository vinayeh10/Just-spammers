import { Component } from '@angular/core';
import { authService } from './authservice';


@Component({
    selector: 'app-authentication',
    template:`
    <header class="row spacing">
    <nav class="col-md-8 col-md-offset-2">
        <ul class="nav nav-pills">
            <li routerLinkActive="active">
                <a [routerLink]="['signin']" *ngIf="!isloggedIn()">Signin</a>
                
            </li>
            <li routerLinkActive="active">
                <a [routerLink]="['signup']">SignUp</a>
            </li>
            <li routerLinkActive="active">
                <a [routerLink]="['logout']" *ngIf="isloggedIn()">Logout</a>
            </li>
        </ul>
    </nav>
    </header>
    <div class="row spacing">
        <router-outlet></router-outlet>
    </div>
    `,
    
})
export class AuthenticationComponent {
   constructor(private authService:authService){}

   isloggedIn(){
       return this.authService.isLoggedIn();
   }

   
}