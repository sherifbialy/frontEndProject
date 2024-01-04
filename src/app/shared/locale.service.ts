import { Inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injector } from '@angular/core';
import { LOCALE_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocaleService implements OnInit{
  
 
  currentLocaleObservable=new Subject<string>();
    
  constructor(@Inject(LOCALE_ID) private currentLocale: string) {
    
  }

  ngOnInit(): void {
    
    this.currentLocaleObservable.next(this.currentLocale)
}

  setLocale() {
    console.log(this.currentLocale);
    if(this.currentLocale=='en-US'){
       
      
        this.currentLocale='ar-AE';
        
    }
    else{
     
       this.currentLocale='en-US';


      }
      this.currentLocaleObservable.next(this.currentLocale)



    
    
  }

  getLocale() {
    return this.currentLocaleObservable;
  }

  getInitialLocale() {
    return this.currentLocale;
  }

  
}