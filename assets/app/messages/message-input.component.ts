import { Component } from '@angular/core';
import { MessageService } from './message.service';
import { Message } from './message.model';
import { NgForm } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Response } from '@angular/http/src/static_response';


@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html'
})
export class MessageInputComponent implements OnInit {

    message:Message;

    constructor(private messageService:MessageService){}

    ngOnInit(){
        this.messageService.messageisEdit.subscribe(
            (message:Message)=>this.message = message
        );
    }


   onSubmit(formData:NgForm){
       if(this.message){
           //edit
           this.message.content = formData.value.content;
          
           this.messageService.updateMessage(this.message).subscribe(
               (message:Message)=>this.message = message
               
           )
       }
       else{
           //create Message

           const message = new Message(formData.value.content,"Max");

       this.messageService.addMessage(message).subscribe(
          // data => console.log(data),
          // error => console.log(error)
       );
       }

       formData.resetForm();
   }

   onClear(inputform:NgForm){
       this.message = null;
    inputform.resetForm()
   }
}