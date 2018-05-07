import { Routes } from "@angular/router";
import { SignUpComponent } from "./signup.component";
import { SignInComponent } from "./signin.component";
import { LogoutComponent } from "./logout.component";

export const AUTH_Routes:Routes = [
    {path:'',redirectTo:'signup',pathMatch:'full'},
    {path:'signin', component:SignInComponent},
    {path:'signup',component:SignUpComponent},
    {path:'logout',component:LogoutComponent}

];