import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
      console.log(value)
      this.email=value.email;
      this.password=value.password;
      
              });
    this.loginForm.statusChanges.subscribe((value)=>{
      //console.log(value)
              });
  }

  onSwitchMode(){
    this.isSignUpMode=!this.isSignUpMode;
  }


  constructor(private authService:AuthenticationService, 
              private router:Router,
              private recaptchaV3Service: ReCaptchaV3Service,
              private http:HttpClient){

  }


 
  executeRecaptcha(){
    
    this.recaptchaV3Service.execute('authRequest')
      .subscribe(
        (token) => {
          

          this.handleToken(token);
        });
  }
  
  
  handleToken(token: string): void {
    let authObs=new Observable<{token:string}>();
    this.isLoading=true;
    console.log(this.email);
    if(this.isSignUpMode){
      
      authObs=this.authService.signUp(this.email,this.password,token)
    }
    else{
      
      authObs=this.authService.login(this.email,this.password,token)
      

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
    this.loginForm.reset();

  }
  
  onSubmit(){
    if(!this.loginForm.valid){
      return;
    }
    this.executeRecaptcha();
    
   
  }
  




}
