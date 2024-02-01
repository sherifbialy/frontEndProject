import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CatalogAPIService } from '../catalog-api.service';
import { Movie } from './movie.model';
import {  ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LocaleService } from '../../shared/locale.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit, OnDestroy{
  movies!:Movie[]
  error!:null;
  //serviceSub!:Subscription;
  page!:number;
  catalogTitle=`${environment.catalogTitle=='Top Rated Movies'&&this.localeService.getInitialLocale()=='ar-AE'?'أفلام ذات تقييم عالي':environment.catalogTitle=='Popular Movies'&&this.localeService.getInitialLocale()=='ar-AE'?'الأفلام الشهيرة':environment.catalogTitle}`;
  isLoading:boolean=false;
  posterURL=environment.moviePosterUrl;
  constructor(private apiService:CatalogAPIService,private router:Router, private route:ActivatedRoute, private localeService:LocaleService) {
    
  }
  ngOnDestroy(): void {
   //this.serviceSub.unsubscribe()
  }
  ngOnInit(): void {
  this.sendReqAndBuild();
   this.subToPageNumber()
   //this.subToMovieService()
    
  
  }

  sendReqAndBuild(){
    this.isLoading=true;
    
    this.apiService.fetchPopularMovies().subscribe({
      next:(fetched)=>{
         this.movies=fetched;
         console.log(this.movies)
         this.isLoading=false;
         
      },error:(error)=>{
            this.error=error.message;
            this.isLoading=false;
            
      }});
    
  }
  subToPageNumber(){
    this.apiService.pageSubject.subscribe((page)=>{
      this.page=page;
    })

  }
  // subToMovieService(){
  //   this.serviceSub=this.apiService.moviesSubject.subscribe(
  //     { 
  //      next:movies => {
  //        this.isLoading=true;
  //        this.movies = movies;
  //        this.isLoading=false;
         
  //      },
  //    error:error=>{
  //      this.error=error
  //      console.log(this.error)
  //      this.isLoading=false;
  //      console.log(this.isLoading)
  //    }});
  // }


  pageNumberPlus(){
    this.isLoading=true;
    this.apiService.flipPage()
    this.apiService.fetchPopularMovies().subscribe({
      next:(fetched)=>{
          //this.moviesSubject.next(fetched);
         this.movies=fetched;
         this.isLoading=false;
         
      },error:(error)=>{
            this.error=error.message;
            this.isLoading=false;
            
      }});
    
  

    
  }
  pageNumberMinus(){
    this.isLoading=true;
    this.apiService.goBack();
    this.apiService.fetchPopularMovies().subscribe({
      next:(fetched)=>{
          //this.moviesSubject.next(fetched);
         this.movies=fetched;
         this.isLoading=false;
         
      },error:(error)=>{
            this.error=error.message;
            this.isLoading=false;
            
      }});
    

   
  }

}
