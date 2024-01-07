import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthGuard, LoginGuard } from './shared/auth-guard.service';
import { CatalogComponent } from './core/catalog/catalog.component';
import { MovieItemComponent } from './core/catalog/movie-item/movie-item.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';


const routes: Routes = [
   {path:'',redirectTo:'catalog',pathMatch:'full'},
   {path:'catalog',
   loadChildren: () => import('./core/core.module').then(m => m.CoreModule)}




// {path:'not-found',component:ErrorPageComponent,data:{
//   message:'Page Not Found'
//   }},
// {path:'**',redirectTo:'/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
