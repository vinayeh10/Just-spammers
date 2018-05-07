import { Component,OnInit } from '@angular/core';
import { authService } from './auth/authservice';
import { Router } from '@angular/router';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls:['./main.css']
})
export class HeaderComponent implements OnInit {
   constructor(private authService:authService,private router:Router){}
    userName:string;
   isloggedIn(){
       return this.authService.isLoggedIn();
   }
   ngOnInit(){
        this.userName  =  window.name;
   }
   onLogOut(){
    this.authService.logout();
    window.name = "";
    this.router.navigate(['/authentication','signup']);
   }
}