import { LanguageService } from './../../services/language-service';
// movie-card.ts
import { Component, Input, OnInit } from '@angular/core';
import { WishListService } from '../../services/wish-list-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: false,
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.css']
})
export class MovieCard implements OnInit {
  @Input() movie!: any;
  currentLang:string=''
wishlist: any[] = [];
  constructor(
    private wishListService: WishListService,
    private router: Router,
   private LanguageService:LanguageService
  ) {}

  ngOnInit(): void {
 this.LanguageService.language.subscribe(lang => {
      this.currentLang=lang
      
    });

  }

// Add or remove the movie from wishlist
  toggleFavourite(event: Event): void {
    // prevent parent navigation/click handlers
    event.stopPropagation();

    if (this.isInWishlist()) {
      this.wishListService.removeFromWishlist(this.movie.id);
    } else {
      this.wishListService.addToWishList(this.movie);
    }
  }

  // Check if the movie is already in wishlist

  isInWishlist(): boolean {
    return this.wishListService.getWishList().some((m: any) => m.id === this.movie.id);
  }

// Limit text to a specific number of words
  getLimitedWords(text: string, limit: number): string {
    if (!text) return '';
    const words = text.split(' ');
    return words.length <= limit
      ? text
      : words.slice(0, limit).join(' ') + '...';
  }

// Return a color based on the movie rating
  getRatingColor(rate: number): string {
    if (rate >= 7) {
      return '#00ff88'; // greenish
    } else if (rate >= 5) {
      return '#ffc107'; // yellow
    } else {
      return '#dc3545'; // red
    }
  }
}
