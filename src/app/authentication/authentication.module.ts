import { NgModule } from "@angular/core";
import { AuthenticationComponent } from "./authentication.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./authentication-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../shared/shared-module";
import { HttpClientModule } from "@angular/common/http";
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";
import { environment } from "../../environments/environment";



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
        SharedModule,
        HttpClientModule,
        RecaptchaV3Module
  
        
      ],
      
      providers: [
        {
          provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha.siteKey
        }
      ],
      bootstrap: []
})
export class AuthModule{
    

}