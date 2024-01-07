import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponseData, AuthenticationService } from '../shared/authentication.service';
import { User } from './user.model';
import { Route, Router } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css',
 
})
export class AuthenticationComponent implements OnInit{
  loginForm!:FormGroup;
  email!:string;
  password!:string;
  isLoading=false;
  error:string|null=null;
  isSignUpMode=false;
 
  ngOnInit(): void {
    
   this.initForm();
    
  }
  
  initForm(){
    this.loginForm=new FormGroup({
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'password': new FormControl(null,[Validators.required,Validators.minLength(6)]),
              });
    this.loginForm.valueChanges.subscribe((value)=>{
      //console.log(value)
      this.email=value.email;
      this.password=value.password;
      console.log(this.error)
              });
    this.loginForm.statusChanges.subscribe((value)=>{
      //console.log(value)
              });
  }

  onSwitchMode(){
    this.isSignUpMode=!this.isSignUpMode;
  }


  constructor(private authService:AuthenticationService, private router:Router){

  }


 

  
  onSubmit(){
    if(!this.loginForm.valid){
      return;
    }
    let authObs=new Observable<AuthResponseData>();
    this.isLoading=true;
    if(this.isSignUpMode){
      
      authObs=this.authService.signUp(this.email,this.password)
    }
    else{
      
      authObs=this.authService.login(this.email,this.password)
      

    }
    authObs.subscribe({
      next:(res)=>{
         console.log(res)
         this.isLoading=false;
         this.router.navigate(['/']);
      },
      error:(error)=>{
        this.isLoading=false;
        this.error=error
        
        console.log(this.error)
      }
    })
   this.loginForm.reset()

  }
  




}
