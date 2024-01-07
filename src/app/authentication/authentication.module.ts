import { NgModule } from "@angular/core";
import { AuthenticationComponent } from "./authentication.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./authentication-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../shared/shared-module";

@NgModule({
    declarations: [
        AuthenticationComponent
      ],
      imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        AuthRoutingModule,
        NgbModule,
        SharedModule
  
        
      ],
      
      providers: [],
      bootstrap: []
})
export class AuthModule{
    

}