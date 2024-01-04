import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
   loggedIn!:boolean;
  constructor(private authService:AuthenticationService){

  }
  ngOnInit(): void {
    this.authService.authStatus.subscribe((status)=>{
           this.loggedIn=status;
    })
  }
  onSignOut(){
    this.authService.logout();
  }


}
