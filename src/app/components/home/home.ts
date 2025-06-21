// home.ts
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { LanguageService } from '../../services/language-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  query = '';
  movies: any[] = [];
  searchResults: any[] = [];
  genreMovies: any[] = [];
  currentPage = 1;
  totalPages = 0;
  viewState: 'movies' | 'search' | 'genre' = 'movies';
  loading = false;
currentLang:string=''
  // Example genres map; adjust as needed
  genres: { [key: number]: string } = {
    28: 'Action',
    35: 'Comedy',
    18: 'Drama',
    10749: 'Romance',
    27: 'Horror',
    878: 'Science Fiction',
    16: 'Animation',
    53: 'Thriller',
    12: 'Adventure',
  };
  selectedGenre: number | null = null; // or default genre ID

  constructor(
    private movieService: MovieService,
    public LanguageService: LanguageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.changeLanguageDirection();
    this.loadMovies(this.currentPage);
   
    // subscribe to language change events
    this.LanguageService.language.subscribe(lang => {
      this.currentLang=lang
      this.changeLanguageDirection();
      this.reloadCurrentView();
  
      
    });
  }

  // Set  direction of component based on selected language
  changeLanguageDirection(): void {
    document.documentElement.dir =
      this.LanguageService.getLanguage() === 'ar' ? 'rtl' : 'ltr';
  }

  // get currently displayed movies 
  getCurrentMovies(): any[] {
    if (this.viewState === 'search') {
      return this.searchResults;
    }
    if (this.viewState === 'genre') {
      return this.genreMovies;
    }
    return this.movies;
  }

  // navigate to search results page
  OnSearch(): void {
    const trimmed = this.query.trim();
    if (!trimmed) {
      console.warn('Search query is empty');
      return;
    }
   
    this.router.navigate(['/search-result'], { queryParams: { q: trimmed } });
  }


  // call the search API 
  search(): void {
    if (!this.query.trim()) {
      console.warn('Search query is empty'); // Debug
      return;
    }
    this.loading = true;
    this.movieService.searchMovies(this.query, this.currentPage).subscribe({
      next: (data) => {
        console.log('Search API Response:', data); // Debug
        this.searchResults = data?.results || [];
        this.totalPages = data?.total_pages || 0;
        this.loading = false;
      },
      error: (err) => {
        console.error('Search API Error:', err); // Debug
        this.loading = false;
      },
    });
  }


  // load all movies by page
  loadMovies(page: number): void {
    this.loading = true;
    this.viewState = 'movies';
    this.movieService.getMoviesByPage(page).subscribe({
      next: (data) => {
        console.log('Movies API Response:', data); // Debug
        this.movies = data?.results || [];
        this.totalPages = data?.total_pages || 0;
        this.loading = false;
      },
      error: (err) => {
        console.error('Movies API Error:', err); // Debug
        this.loading = false;
      },
    });
  }


// load movies for a specific genre
  fetchMoviesByGenre(): void {
    if (!this.selectedGenre) {
      console.warn('No genre selected'); // Debug
      return;
    }
    this.currentPage = 1;
    this.viewState = 'genre';
    this.loading = true;
    this.movieService.getMoviesByGenre(this.selectedGenre, this.currentPage).subscribe({
      next: (data) => {
        console.log('Genre API Response:', data); // Debug
        this.genreMovies = data?.results || [];
        this.totalPages = data?.total_pages || 0;
        this.loading = false;
      },
      error: (err) => {
        console.error('Genre API Error:', err); // Debug
        this.loading = false;
      },
    });
  }

   //go to next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      console.log('Navigating to Next Page:', this.currentPage); // Debug
      this.reloadCurrentView();
    }
  }
// go to previous page 
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      console.log('Navigating to Previous Page:', this.currentPage); // Debug
      this.reloadCurrentView();
    }
  }

  // jump to a specific page number
  goToPage(page: number): void {
    if (page === this.currentPage) {
      return;
    }
    this.currentPage = page;
    console.log('Navigating to Page:', this.currentPage); // Debug
    this.reloadCurrentView();
  }
  //  Generate array of pagination buttons
getDisplayedPages(): number[] {
    const maxPagesToShow = 5;
    let start = Math.max(1, this.currentPage - 2);
    let end = Math.min(this.totalPages, start + maxPagesToShow - 1);
    if (end - start < maxPagesToShow - 1) {
      start = Math.max(1, end - maxPagesToShow + 1);
    }
    const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    console.log('Displayed Pages:', pages); // Debug
    return pages;
  }
  // Jump to a specific page number
  private reloadCurrentView(): void {
    console.log('Reloading View:', this.viewState, 'Page:', this.currentPage); // Debug
    if (this.viewState === 'movies') {
      this.loadMovies(this.currentPage);
    } else if (this.viewState === 'genre') {
      if (!this.selectedGenre) {
        console.warn('No genre selected in reload'); // Debug
        return;
      }
      this.loading = true;
      this.movieService.getMoviesByGenre(this.selectedGenre, this.currentPage).subscribe({
        next: (data) => {
          console.log('Genre Reload API Response:', data); // Debug
          this.genreMovies = data?.results || [];
          this.totalPages = data?.total_pages || 0;
          this.loading = false;
        },
        error: (err) => {
          console.error('Genre Reload API Error:', err); // Debug
          this.loading = false;
        },
      });
    } else if (this.viewState === 'search') {
      this.search();
    }
  }


  
  

  

  selectLanguage(lang: string) {
    this.LanguageService.setLanguage(lang);
  }
}
