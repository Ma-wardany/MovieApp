import { Component } from '@angular/core';
import { LanguageService } from './../../services/language-service';

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  selectedLang: string = 'en';

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    // subscribe to language change events
    this.languageService.language.subscribe(lang => {
      this.selectedLang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    });
  }

  selectLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }
}
