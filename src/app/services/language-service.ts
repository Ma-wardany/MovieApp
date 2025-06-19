import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  private CurruntLanguage= new BehaviorSubject<string>('en')
  language=this.CurruntLanguage.asObservable()

  setLanguage(lang:string){
    this.CurruntLanguage.next(lang);
  }

  getLanguage():string{
    return this.CurruntLanguage.value;
  }
}
