import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Subject, map } from "rxjs";
import { Movie } from "./movie.model";
import { MovieResponse } from "./movie-response.model";
import { LocaleService } from "../shared/locale.service";
import { environment } from '../../environments/environment';


//var dbUrl='https://api.themoviedb.org/3/movie/popular?language=ar&page=1';
@Injectable({
    providedIn:'root'
})
export class CatalogAPIService implements OnInit{
    movies!:Movie[]
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
        this.fetchPopularMovies();
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
        this.pageSubject.next(this.pageNumber)
        this.localeService.currentLocaleObservable.subscribe((locale) => {
            
            this.currentLocale = locale;
    
            
            this.dbUrl=`${environment.apiBaseUrl}?language=${this.currentLocale=='ar-AE'?this.currentLocale.substring(0,2):this.currentLocale}&page=${this.pageNumber.toString()}`
    
            
            console.log(this.dbUrl);
        });
        
    }

    fetchPopularMovies(){
        return this.http.get<MovieResponse>(this.dbUrl, {
            headers: new HttpHeaders(
                {
                    accept: 'application/json',
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2EyNmQxNmEwNzAzM2UwZDc5NDE5YjVlMjI2ZjRmMyIsInN1YiI6IjY1OTNmODBiMWNhYzhjNjNlYzBjODZhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w2icg8CpKVN0RKiokNTazAWRY5rIxwiuNuuZQ0SzYwY`

            })
                
              }).pipe(map(
                    responseData=>{
                        console.log(responseData)
                        const movieArray:Movie[]=[];
                        movieArray.push(...responseData.results)
                        
                        return movieArray;

                    }
              )).subscribe({
                next:(fetched)=>{
                    this.moviesSubject.next(fetched);
                   this.movies=fetched;
                   
                },error:(error)=>{
                      this.error=error.message;
                      
                }})
    }
    getMovie(index:number){
        return this.movies[index];
    }


}