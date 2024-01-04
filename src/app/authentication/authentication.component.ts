import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.service';
import { User } from './user.model';
import { Route, Router } from '@angular/router';
import { CsvService } from '../shared/csv.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css',
 
})
export class AuthenticationComponent implements OnInit{
  loginForm!:FormGroup;
  email!:string;
  password!:string;
  //this.userNotExists.bind(this)
  ngOnInit(): void {
    
    //this.renderer.setStyle(document.body, 'background-image', 'url("assets/cinema.jpg")');
    this.loginForm=new FormGroup({
        'email':new FormControl(null,[Validators.required,Validators.email,this.userNotExists.bind(this)]),
        'password': new FormControl(null,[Validators.required,Validators.minLength(6)]),
       
    });
    this.loginForm.valueChanges.subscribe((value)=>{
      console.log(value)
      this.email=value.email;
      this.password=value.password;
     });
    this.loginForm.statusChanges.subscribe((value)=>{
      console.log(value)
       });
  }
  constructor(private authService:AuthenticationService, private router:Router,private _csvService: CsvService){

  }
  userNotExists(control: FormControl):{[s:string]:boolean}|null{
    console.log(control)
    const userExists = this.authService.registeredUsers.some((element: User) => {
      
      return element.email === control.value;
    });
  
    return userExists ? null: {userExists:true};
  }
    

  
  onSubmit(){
    let user:User={email:this.email,password:this.password}
    this.authService.login(user);
    this.router.navigate([''])

  }
  




}
