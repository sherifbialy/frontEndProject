import { NgModule } from "@angular/core";

import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CatalogComponent } from "./catalog/catalog.component";
import { MovieItemComponent } from "./catalog/movie-item/movie-item.component";
import { CoreRoutingModule } from "./core-routing.module";
import { SharedModule } from "../shared/shared-module";
// import { CoreRoutingModule } from "./core-routing.module";


@NgModule({
    declarations: [
        CatalogComponent,
        MovieItemComponent
      ],
      imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        CoreRoutingModule,
        SharedModule
        
        
      ],
      
      providers: [],
      bootstrap: []
})
export class CoreModule{
    

}