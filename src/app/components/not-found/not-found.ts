import { LanguageService } from './../../services/language-service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: false,
  templateUrl: './not-found.html',
  styleUrl: './not-found.css'
})
export class NotFound {
currentLang:string=''
constructor( public LanguageService: LanguageService){}
  ngOnInit(): void {
    this.LanguageService.language.subscribe(lang => {
      this.currentLang=lang
      
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    });
  }
}
