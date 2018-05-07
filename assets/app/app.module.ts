import { NgModule} from '@angular/core';
import { HttpModule} from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from "./app.component";
import { MessageComponent } from './messages/message.component';
import { MessageListComponent } from './messages/message-list.component';
import { MessageInputComponent } from './messages/message-input.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header.component';
import { Routing } from './app.routing';
import { LogoutComponent } from './auth/logout.component';
import { SignInComponent } from './auth/signin.component';
import { SignUpComponent } from './auth/signup.component';
import { authService } from './auth/authservice';
import { ErrorService } from './error/error.service';
import { ErrorComponent } from './error/error.component';

@NgModule({
    declarations: [
        AppComponent,MessageComponent,MessageListComponent,MessageInputComponent,
        MessagesComponent,AuthenticationComponent,HeaderComponent,LogoutComponent,
        SignInComponent,SignUpComponent,ErrorComponent
    ],
    imports: [BrowserModule,FormsModule,Routing,ReactiveFormsModule,HttpModule],
    providers:[authService,ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {

}