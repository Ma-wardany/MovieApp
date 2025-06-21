import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

private currentLanguage: BehaviorSubject<string>;
  public language: Observable<string>;

  constructor() {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.currentLanguage = new BehaviorSubject<string>(savedLang);
    this.language = this.currentLanguage.asObservable();
  }

  //set vaule for currentLanguage
  setLanguage(lang: string): void {
    this.currentLanguage.next(lang);
    localStorage.setItem('lang', lang);
  }

  //get vaule for currentLanguage
  getLanguage(): string {
    return this.currentLanguage.value;
  }
}
