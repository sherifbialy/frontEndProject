import { Injectable, OnInit } from "@angular/core";
import { User } from "../authentication/user.model";
import { FormControl } from "@angular/forms";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";

export interface AuthResponseData{
  idToken:string,
  email:string
  refreshToken:string
  expiresIn:string
  localId:string,
  registered?:boolean
}

@Injectable({
    providedIn:'root'
})
export class AuthenticationService implements OnInit{
    
    user=new BehaviorSubject<User|null>(null);
    
   
    private expirationTimer:any;
    constructor(private router:Router, private http:HttpClient){

    }
    
    ngOnInit(): void {
      
    }
    
      signUp(email:string,password:string){
       
       
       return this.http.post<AuthResponseData>(`${environment.signUpUrl}${environment.fbApiKey}`,
        {
          email:email,
          password:password,
          returnSecureToken:true
        }).pipe(
          catchError(this.handleError),
          tap(resData => {
            this.handleAuthentication(
              resData.email,
              resData.localId,
              resData.idToken,
              +resData.expiresIn
            );
          })
        );

      }
login(email:string,password:string){
  return this.http.post<AuthResponseData>(`${environment.signInUrl}${environment.fbApiKey}`,
    {
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(this.handleError),
    tap(resData => {
      this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn
      );
    }))
}
      autoLogin(){
        const userData=localStorage.getItem('userData');
        if(!userData){
          return
        }
        else{
          const userDataJSON:{
             email:string,
        id:string,
      _token:string,
      _tokenExpire:Date,
          }=JSON.parse(localStorage.getItem('userData')!);
          let user=new User(userDataJSON.email,userDataJSON.id,userDataJSON._token,new Date(userDataJSON._tokenExpire))
          if(user.token){
            this.user.next(user);
            const expirationDuration=new Date(userDataJSON._tokenExpire).getTime()-new Date().getTime()
            this.autoLogout(expirationDuration)
          }
        }

             


      }
      autoLogout(expirationDuration:number){
        this.expirationTimer=setTimeout(()=>{
          this.logout()
        },expirationDuration)

      }
      logout(){
        
        this.user.next(null);
        this.router.navigate(['/login']);
        if(this.expirationTimer){
         clearTimeout(this.expirationTimer);
        }
        localStorage.removeItem('userData')
      }
      private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
      ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn*1000)
        localStorage.setItem('userData',JSON.stringify(user))
      }
    
      private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
          console.log('error')
          return throwError(()=>new Error(errorMessage));
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
            break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist.';
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct.';
            break;
        }
        console.log('error1')
        return throwError(()=>new Error(errorMessage));
      }
}