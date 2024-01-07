import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
   loggedIn!:boolean;
   isCollapsed:boolean=true;
   authSub!:Subscription;
  constructor(private authService:AuthenticationService){

  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe()
  }
  ngOnInit(): void {
    this.subToAuth()
  }
  subToAuth(){
    this.authSub=this.authService.user.subscribe((user)=>{
      this.loggedIn=!!user;
           
    })

  }
  onSignOut(){
    this.authService.logout();
  }


}
