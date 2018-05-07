import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { authService } from './authservice';
import { User } from './user.model';

declare let swal:any;
@Component({
    selector: 'app-signup',
    templateUrl:'./signup.component.html'
    
})
export class SignUpComponent implements OnInit{
    myForm:FormGroup

    constructor(private authservice:authService){}

    onSubmit(){
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.firstName,
            this.myForm.value.lastName
        );

        this.authservice.signUp(user).subscribe(
        (data)=>swal('Congratulations!','Signup successfull please signin to continue','success'));
        this.myForm.reset();
    }

   ngOnInit(){
        this.myForm = new FormGroup({
            firstName:new FormControl(null,Validators.required),
            lastName:new FormControl(null,Validators.required),
            email:new FormControl(null,[
                Validators.required,                
                Validators.email
            ]),
            password:new FormControl(null,Validators.required),
        });
   }
}