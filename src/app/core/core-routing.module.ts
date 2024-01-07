import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { AuthGuard, LoginGuard } from "../shared/auth-guard.service";
import { MovieItemComponent } from "./catalog/movie-item/movie-item.component";
import { CatalogComponent } from "./catalog/catalog.component";

const routes:Routes=[
    {path:'',component:CatalogComponent,pathMatch:'full',canActivate:[LoginGuard],
},
{path:':id',component:MovieItemComponent,canActivate:[LoginGuard]},
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]

})
export class CoreRoutingModule{

}