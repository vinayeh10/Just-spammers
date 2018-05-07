import { Routes ,RouterModule} from "@angular/router";
import { AuthenticationComponent } from "./auth/authentication.component";
import { MessagesComponent } from "./messages/messages.component";
import { AUTH_Routes } from "./auth/auth.routes";
import { SignInComponent} from "./auth/signin.component";
import { SignUpComponent} from "./auth/signup.component";
import { LogoutComponent} from "./auth/logout.component";



const APP_ROUTES:Routes = [
    {path:'',redirectTo:'/messages',pathMatch:"full"},
    {path:'messages',component:MessagesComponent},
    {path:'authentication/signup',component:SignUpComponent},
    {path:'authentication/signin',component:SignInComponent},
    {path:'authentication/logout',component:LogoutComponent},
    {path:'authentication',component:AuthenticationComponent,children:AUTH_Routes}   
];

export const Routing = RouterModule.forRoot(APP_ROUTES);