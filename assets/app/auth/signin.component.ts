import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { User } from './user.model';
import { authService } from './authservice';
import { Router } from '@angular/router';

declare let swal:any;
@Component({
    selector: 'app-signin',
    templateUrl:'./signin.component.html'
    
})
export class SignInComponent implements OnInit{
    
    myForm:FormGroup;

    constructor(private auth:authService,private router:Router){}

    onSubmit(){
        const user = new User(this.myForm.value.email,this.myForm.value.password);

        this.auth.signIn(user).subscribe(
            (data)=>{
                localStorage.setItem('token',data.token);
                localStorage.setItem('userId',data.userId);
                window.name = data.UserName;
                swal("Success!","Login Successful","success");         
                this.router.navigateByUrl('/');
            },
            (error)=>console.error(error)
        )
        this.myForm.reset();
    }

   ngOnInit(){
        this.myForm = new FormGroup({
            email:new FormControl(null,[
                Validators.required,                
                Validators.email
            ]),
            password:new FormControl(null,Validators.required),
        });
   }
}