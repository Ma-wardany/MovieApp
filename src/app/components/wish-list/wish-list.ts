import { LanguageService } from './../../services/language-service';
import { Component, OnInit } from '@angular/core';
import { WishListService } from '../../services/wish-list-service';

@Component({
  selector: 'app-wish-list',
  standalone: false,
  templateUrl: './wish-list.html',
  styleUrl: './wish-list.css'
})
export class WishList implements OnInit {
wishlist: any[] = [];
  currentLang: string = 'en';

  constructor(private _wishListService: WishListService ,public LanguageService:LanguageService) {}

  ngOnInit(): void {
 
// subscribe to language change events
   this.LanguageService.language.subscribe((lang:string) => {
    this.currentLang = lang;
    this.setDirection(lang);
     this._wishListService.refetchWishListMovies();
  });

 // subscribe to wishlist change events
  this._wishListService.wishList$.subscribe((list) => {
    this.wishlist = list;
  });
  }
setDirection(lang: string) {
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}
 //remove From WishList

  removeFromWishList(id: number) {
    this._wishListService.removeFromWishlist(id);
  }

  getStarsArray(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < rating);
  }

  setRating(movie: any, rating: number): void {
    movie.rating = rating;

    // Optional: persist the change if service supports it
    // this._wishListService.updateRating(movie.id, rating);
  }
}
