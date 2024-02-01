import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Subject, map } from "rxjs";
import { Movie } from "./catalog/movie.model";
import { LocaleService } from "../shared/locale.service";
import { environment } from '../../environments/environment';


//var dbUrl='https://api.themoviedb.org/3/movie/popular?language=ar&page=1';
@Injectable({
    providedIn:'root'
})
export class CatalogAPIService implements OnInit{
    
    error=null
    pageNumber=1;
    //dbUrl=`${environment.apiBaseUrl}?language=${this.localeService.getInitialLocale()=='ar-AE'?this.localeService.getInitialLocale().substring(0,2):this.localeService.getInitialLocale()}&page=${this.pageNumber.toString()}`
    dbUrl=`${environment.apiBaseUrl}?page=${this.pageNumber.toString()}`
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
        this.dbUrl=`${environment.apiBaseUrl}?page=${this.pageNumber.toString()}`
            this.fetchPopularMovies();
        
      }
      goBack(){
        if(this.pageNumber>1){
            this.pageNumber-=1;
            this.pageSubject.next(this.pageNumber)
            //this.dbUrl=`${environment.apiBaseUrl}?language=${this.currentLocale=='ar-AE'?this.currentLocale.substring(0,2):this.currentLocale}&page=${this.pageNumber.toString()}`
            this.dbUrl=`${environment.apiBaseUrl}?page=${this.pageNumber.toString()}`
            this.fetchPopularMovies();
        }
        

      }

      ngOnInit(): void {
        this.pageSubject.next(this.pageNumber);
        this.subToLocaleService();
        
        
    }
    subToLocaleService(){
        this.localeService.currentLocaleObservable.subscribe((locale) => {
            
            //this.currentLocale = locale;
    
            
            //this.dbUrl=`${environment.apiBaseUrl}?language=${this.currentLocale=='ar-AE'?this.currentLocale.substring(0,2):this.currentLocale}&page=${this.pageNumber.toString()}`
            this.dbUrl=`${environment.apiBaseUrl}?page=${this.pageNumber.toString()}`
    
            
            console.log(this.dbUrl);
        });
    }

    fetchPopularMovies(){
        const userData = localStorage.getItem("userData") ; 
        //console.log(userData)
        let userDataJson:{email:string,_token:string,expirationDate:Date}=userData? JSON.parse(userData):null; 
        const token = userDataJson._token; 
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
        
        return this.http.get<Movie[]>(this.dbUrl, {
        
           headers:headers
                
              }).pipe(map(
                    responseData=>{
                       
                        const movieArray:Movie[]=[];
                        for (const movie of responseData) {
                            movieArray.push(movie);
                        }
                        console.log(movieArray)
                        return movieArray;

                    }
              ))
    }
    // getMovie(index:number){
    //     return this.movies[index];
    // }
    getOneMovie(id:string){
        //console.log(`${environment.detailBaseUrl}${id}`)
        const userData = localStorage.getItem("userData") ; 
        let userDataJson:{email:string,_token:string,expirationDate:Date}=userData? JSON.parse(userData):null; 
        const token = userDataJson._token; 
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
        return this.http.get<Movie>(`${environment.detailBaseUrl}${id}`,{
            
           headers:headers
        })
    
    }


}