import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthGuard } from './shared/auth-guard.service';
import { CatalogComponent } from './catalog/catalog.component';
import { MovieItemComponent } from './catalog/movie-item/movie-item.component';
import { ErrorPageComponent } from './error-page/error-page.component';
//import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  {path:'',component:CatalogComponent,pathMatch:'full',canActivate:[AuthGuard],
  },
  {path:'movie/:id',component:MovieItemComponent,canActivate:[AuthGuard]},
  
  {path:'login',component:AuthenticationComponent},
 
  {path:'not-found',component:ErrorPageComponent,data:{
    message:'Page Not Found'
    }},
  {path:'**',redirectTo:'/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
