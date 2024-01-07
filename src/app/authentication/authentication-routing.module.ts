import { RouterModule, Routes } from "@angular/router";
import { AuthenticationComponent } from "./authentication.component";
import { NgModule } from "@angular/core";
import {  LoginGuard } from "../shared/auth-guard.service";

const routes:Routes=[
  {path:'login',component:AuthenticationComponent,canActivate:[LoginGuard]},
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]

})
export class AuthRoutingModule{

}