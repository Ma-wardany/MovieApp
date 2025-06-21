import { LanguageService } from './../../services/language-service';
import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { WishListService } from '../../services/wish-list-service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-search-result',
  standalone: false,
  templateUrl: './search-result.html',
  styleUrl: './search-result.css',
})
export class SearchResult implements OnInit {
  term = '';
  movies: any[] = [];
  loading = false;
  currentLang: string = 'en';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    public wishListService: WishListService,
    public LanguageService:LanguageService
  ) {}

ngOnInit(): void {
  this.route.queryParams.subscribe((params) => {
    const q = params['q']?.trim() || '';
    this.term = q;
    this.loadSearchResults();
  });

 
  this.LanguageService.language.subscribe(lang => {
    this.currentLang = lang;
    this.loadSearchResults();
    this.changeLanguageDirection();
  });
}

changeLanguageDirection(): void {
    document.documentElement.dir =
      this.LanguageService.getLanguage() === 'ar' ? 'rtl' : 'ltr';
  }
  loadSearchResults(): void {
  const q = this.term.trim();
  if (!q) {
    this.movies = [];
    return;
  }

  this.loading = true;
  this.movieService.searchMoviesByTitle(q).subscribe({
    next: (results) => {
      this.movies = results;
      this.loading = false;
    },
    error: (err) => {
      console.error('Search API Error:', err);
      this.movies = [];
      this.loading = false;
    },
  });
}

}
