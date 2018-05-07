import { Component,OnInit,OnDestroy } from '@angular/core';
import { Message } from './message.model';
import { MessageService } from './message.service';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import { interval } from 'rxjs/observable/interval';


@Component({
    selector: 'app-message-list',
    template: `
    <div class="col-md-8 col-md-offset-2">
    <app-message [message]="message" 
    *ngFor="let message of messages"></app-message> 
    </div>  
    `
})
export class MessageListComponent implements OnInit,OnDestroy{

    messages:Message[];
    messageObservable = interval(5000).startWith(0);
    messageObser:any;


    constructor(private messageService:MessageService,private router:Router){
        
    }
    
    ngOnInit(){
        this.messageObser =  this.messageObservable.subscribe(()=>this.getMessagesFromService()); 
       //this.getMessagesFromService(); 
    }

    ngOnDestroy(){
        this.messageObser.unsubscribe();
    }

    getMessagesFromService(){
        this.messageService.getMessages()
        .subscribe(
            (messages: Message[]) => {
                this.messages = messages;
            }
        )
    }
}
