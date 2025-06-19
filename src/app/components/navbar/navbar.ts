import { LanguageService } from './../../services/language-service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
 constructor(private LanguageService: LanguageService){

 }

 selectedLang:string = 'en';

 selectLanguage(lang: string): void {
    this.selectedLang = lang;
    this.LanguageService.setLanguage(lang);

   
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}


