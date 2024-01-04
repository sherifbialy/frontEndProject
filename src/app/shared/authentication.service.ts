import { Injectable, OnInit } from "@angular/core";
import { User } from "../authentication/user.model";
import { FormControl } from "@angular/forms";
import { Subject } from "rxjs";
import { Router } from "@angular/router";


@Injectable({
    providedIn:'root'
})
export class AuthenticationService implements OnInit{
    
    authStatus=new Subject<boolean>();
    loggedIn=false;

    constructor(private router:Router){

    }
    registeredUsers:User[]=[
        {email:'dan@lofe.com',password:'123456'}
    ]
    ngOnInit(): void {
        this.authStatus.next(this.loggedIn);
    }
    
      addUser(user:User){
        this.registeredUsers.push(user);

      }

      login(user:User){
       this.registeredUsers.forEach(element => {
        if(user.email==element.email &&user.password==element.password){
            this.loggedIn=true;
            this.authStatus.next(this.loggedIn);
        }
        
       });


      }
      logout(){
        this.loggedIn=false;
        this.authStatus.next(this.loggedIn);
        console.log('logout')
        this.router.navigate(['/login']);
      }

}