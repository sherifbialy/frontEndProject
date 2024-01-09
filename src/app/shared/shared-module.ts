import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LanguageSwitcherComponent } from "./header/language-switcher/language-switcher.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'

const routes: Routes = [

    // {path:'not-found',component:ErrorPageComponent,data:{
    //   message:'Page Not Found'
    //   }},
    // {path:'**',redirectTo:'/not-found'}
    ];

@NgModule({
    declarations: [
       HeaderComponent,
       ErrorPageComponent,
       LanguageSwitcherComponent
      ],
      imports: [
        RouterModule.forChild(routes),
        CommonModule,
        NgbModule,
        MatProgressSpinnerModule
   
        
        
      ],
      exports:[
        RouterModule,
        HeaderComponent,
        ErrorPageComponent,
        LanguageSwitcherComponent,
        MatProgressSpinnerModule
        
        
      ]
      ,
      providers: [],
      bootstrap: []
})
export class SharedModule{
    

}