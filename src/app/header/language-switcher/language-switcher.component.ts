import { Component, OnInit } from '@angular/core';

import { LocaleService } from '../../shared/locale.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl:'./language-switcher.component.html' 
    
  
})
export class LanguageSwitcherComponent implements OnInit {
  
  currentLocale!: string;

  constructor(private localeService: LocaleService) {}

  ngOnInit() {
    
    this.localeService.getLocale().subscribe(locale => {
      //console.log(locale)
      this.currentLocale = locale;
      
    });
   
  }

  toggleLang() {
    console.log(this.currentLocale);
    this.localeService.setLocale();
  }
}