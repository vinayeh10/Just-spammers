import { Message } from './message.model';
import { Injectable } from '@angular/core';
import { Http ,Headers,Response} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { EventEmitter } from '@angular/core';
import { URLSearchParams } from '@angular/http/src/url_search_params';
import { ErrorService } from '../error/error.service';
import { Router } from '@angular/router';

@Injectable()
export class MessageService{

    messageisEdit = new EventEmitter<Message>();
    messages:Message[]=[];

    constructor(public http:Http,public errorService:ErrorService,private router:Router){}

    addMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post('http://localhost:5000/message'+token, body, {headers: headers})
            .map((response: Response) => {
                
                var result = response.json();
                                
                const message = new Message
                (result.obj.content,
                    result.userName,
                    result.obj._id,
                    result.obj.user);
                this.messages.push(message);
                return message;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getMessages(){       
        
        return this.http.get('http://localhost:5000/message')
        .map((response:Response)=>{
            const messages = response.json().obj;
            var finalMessageList:Message[]=[];
            for(let message of messages){
                finalMessageList.push(new Message
                    (message.content, message.user.firstName, message._id, message.user._id))
            }
            this.messages = finalMessageList;
            return finalMessageList;
        })
        .catch((error: Response) => {
            this.router.navigate(['/authentication','signin'])
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    }

    editMessage(message:Message){
        this.messageisEdit.emit(message);
    }

    updateMessage(message:Message){
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch('http://localhost:5000/message/' + message.messageId+token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteMessage(message:Message){       
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete('http://localhost:5000/message/' + message.messageId + token)
            .map((response: Response) =>{
                const result = response.json()
                this.messages.splice(this.messages.indexOf(message),1);
                return result
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}