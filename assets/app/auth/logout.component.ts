import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { authService } from './authservice';


@Component({
    selector: 'app-logout',
    template:`
    <div class="col-md-8 col-md-offset-2">
    <button class="btn btn-danger" (click)="onLogOut()">Logout</button>
    </div>
    `,
    
})
export class LogoutComponent{

    constructor(private authservice:authService,private router:Router){}
    onLogOut(){
        this.authservice.logout();
        window.name = "";
        this.router.navigate(['/authentication','signup']);
    }
}