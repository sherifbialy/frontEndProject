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
  error:string|null=null

  constructor(private apiService:CatalogAPIService,private route:ActivatedRoute){

  }
  ngOnInit(): void {
    this.sendRequestAndBuild()
    
  }
    
  sendRequestAndBuild(){
    this.route.params.subscribe((data)=>{
      this.index=+data['id'];
      this.isLoading=true;
      this.apiService.getOneMovie(this.index.toString()).subscribe(
        {next:
          (fetched)=>{
            console.log(fetched)
            this.isLoading=false;
            this.details=fetched
          },
        error:(error)=>{
          this.isLoading=false;
          this.error=error
        }}
        );
      console.log(this.details);
      this.isLoading=false;
    })

  }


}
