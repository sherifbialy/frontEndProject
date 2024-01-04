import { Component, OnInit } from '@angular/core';
import { CatalogAPIService } from '../catalog-api.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.css'
})
export class MovieItemComponent implements OnInit {
  index!:number;
  details!:Movie;
  isLoading=false;

  constructor(private apiService:CatalogAPIService,private route:ActivatedRoute){

  }
  ngOnInit(): void {
    this.route.params.subscribe((data)=>{
      this.index=+data['id'];
      this.details=this.apiService.getMovie(this.index);
      console.log(this.details)
      this.isLoading=false;
    })
    
  }


}
