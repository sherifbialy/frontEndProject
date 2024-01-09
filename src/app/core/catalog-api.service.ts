import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Subject, map } from "rxjs";
import { Movie } from "./catalog/movie.model";
import { MovieResponse } from "./catalog/movie-response.model";
import { LocaleService } from "../shared/locale.service";
import { environment } from '../../environments/environment';


//var dbUrl='https://api.themoviedb.org/3/movie/popular?language=ar&page=1';
@Injectable({
    providedIn:'root'
})
export class CatalogAPIService implements OnInit{
    
    error=null
    pageNumber=1;
    dbUrl=`${environment.apiBaseUrl}?language=${this.localeService.getInitialLocale()=='ar-AE'?this.localeService.getInitialLocale().substring(0,2):this.localeService.getInitialLocale()}&page=${this.pageNumber.toString()}`
    moviesSubject = new Subject<Movie[]>();
    pageSubject = new Subject<number>();
    currentLocale=this.localeService.getInitialLocale();
    movies$ = this.moviesSubject.asObservable();
    


    constructor(private http:HttpClient, private localeService:LocaleService){

      }
      flipPage(){
        console.log(this.pageNumber)
        this.pageNumber+=1;
        this.pageSubject.next(this.pageNumber)
        this.dbUrl=`${environment.apiBaseUrl}?language=${this.currentLocale=='ar-AE'?this.currentLocale.substring(0,2):this.currentLocale}&page=${this.pageNumber.toString()}`
        
      }
      goBack(){
        if(this.pageNumber>1){
            this.pageNumber-=1;
            this.pageSubject.next(this.pageNumber)
            this.dbUrl=`${environment.apiBaseUrl}?language=${this.currentLocale=='ar-AE'?this.currentLocale.substring(0,2):this.currentLocale}&page=${this.pageNumber.toString()}`
            this.fetchPopularMovies();
        }
        

      }

      ngOnInit(): void {
        this.pageSubject.next(this.pageNumber);
        this.subToLocaleService();
        
        
    }
    subToLocaleService(){
        this.localeService.currentLocaleObservable.subscribe((locale) => {
            
            this.currentLocale = locale;
    
            
            this.dbUrl=`${environment.apiBaseUrl}?language=${this.currentLocale=='ar-AE'?this.currentLocale.substring(0,2):this.currentLocale}&page=${this.pageNumber.toString()}`
    
            
            console.log(this.dbUrl);
        });
    }

    fetchPopularMovies(){
        console.log(this.dbUrl)
        return this.http.get<MovieResponse>(this.dbUrl, {
        
           params:new HttpParams().set('api_key',environment.apiKey)
                
              }).pipe(map(
                    responseData=>{
                        console.log(responseData)
                        const movieArray:Movie[]=[];
                        movieArray.push(...responseData.results)
                        
                        return movieArray;

                    }
              ))
    }
    // getMovie(index:number){
    //     return this.movies[index];
    // }
    getOneMovie(id:string){
        console.log(`${environment.detailBaseUrl}${id}`)
        return this.http.get<Movie>(`${environment.detailBaseUrl}${id}`,{
            
            params:new HttpParams().set('api_key',environment.apiKey)
        })
    
    }


}