import { Component, OnInit } from '@angular/core';
import { CatalogAPIService } from '../../catalog-api.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../movie.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.css'
})
export class MovieItemComponent implements OnInit {
  index!:number;
  details!:Movie;
  isLoading=false;
  posterURL=environment.moviePosterUrl;


  constructor(private apiService:CatalogAPIService,private route:ActivatedRoute){

  }
  ngOnInit(): void {
    this.subToParamsAndBuild()
    
  }

  subToParamsAndBuild(){
    this.route.params.subscribe((data)=>{
      this.index=+data['id'];
      this.details=this.apiService.getMovie(this.index);
      
      this.isLoading=false;
    })

  }


}
