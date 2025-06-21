import { LanguageService } from './../../services/language-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer implements OnInit{
currentLang:string=''
constructor( public LanguageService: LanguageService){}
  ngOnInit(): void {
    this.LanguageService.language.subscribe(lang => {
      this.currentLang=lang
      
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    });
  }


}
