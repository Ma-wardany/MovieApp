import { LanguageService } from './../../services/language-service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  searchQuery: string = '';

  isActive = false;
  query = '';
  movies: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  searchTerm: string = '';
  loading: boolean = true;
  genreMovies: any[] = [];
  selectedGenre: number | null = 28;
  selectedGenreName: string = '';
  searchResults: any[] = [];
  viewState: 'movies' | 'search' | 'genre' = 'movies';

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

  constructor(
    private movieService: MovieService,
    private router: Router,
    public LanguageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.loadMovies(this.currentPage);
    this.fetchMoviesByGenre();

    this.LanguageService.language.subscribe((lang) => {
      this.changeLanguage();
      this.reloadData();
    });
  }

  toggleMenu() {
    this.isActive = !this.isActive;
  }

  reloadData(): void {
    if (this.viewState === 'movies') {
      this.loadMovies(this.currentPage);
    } else if (this.viewState === 'genre') {
      this.fetchMoviesByGenre();
    } else if (this.viewState === 'search') {
      this.search();
    }
  }

  OnSearch() {
    if (!this.query.trim()) return;
    this.router.navigate(['/search-result'], {
      queryParams: { q: this.query },
    });
  }
  search(): void {
    if (!this.searchQuery.trim()) {
      return;
    }
    this.loading = true;
    this.viewState = 'search';
    this.movieService
      .searchMovies(this.searchQuery, this.currentPage)
      .subscribe(
        (data) => {
          if (data && data.results) {
            this.searchResults = data.results;
            this.totalPages = data.total_pages;
          } else {
            console.error('No search results found');
            this.searchResults = [];
          }
          this.loading = false;
        },
        (error) => {
          console.error('Error searching movies:', error);
          this.loading = false;
        }
      );
  }

  loadMovies(page: number): void {
    this.loading = true;
    this.viewState = 'movies';
    this.movieService.getMoviesByPage(page).subscribe(
      (data) => {
        if (data && data.results) {
          this.movies = data.results;
        } else {
          console.error('No movie data received');
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching movies:', error);
        this.loading = false;
      }
    );
  }

  fetchMoviesByGenre(): void {
    if (this.selectedGenre !== null) {
      this.loading = true;
      this.viewState = 'genre'; // Show genre movies
      this.selectedGenreName = this.genres[this.selectedGenre];
      this.movieService
        .getMoviesByGenre(this.selectedGenre, this.currentPage)
        .subscribe(
          (data) => {
            if (data && data.results) {
              this.genreMovies = data.results;
              this.totalPages = data.total_pages;
            } else {
              console.error('No genre movies found');
              this.genreMovies = [];
            }
            this.loading = false;
          },
          (error) => {
            console.error('Error fetching genre movies:', error);
            this.loading = false;
          }
        );
    }
  }

  nextPage(): void {
    if (this.currentPage) {
      this.currentPage++;
      if (this.viewState === 'movies') {
        this.loadMovies(this.currentPage);
      } else if (this.viewState === 'genre') {
        this.fetchMoviesByGenre();
      } else if (this.viewState === 'search') {
        this.search();
      }
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      if (this.viewState === 'movies') {
        this.loadMovies(this.currentPage);
      } else if (this.viewState === 'genre') {
        this.fetchMoviesByGenre();
      } else if (this.viewState === 'search') {
        this.search();
      }
    }
  }

  goToPage(page: number): void {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
      this.currentPage = page;

      if (this.viewState === 'movies') {
        this.loadMovies(page);
      } else if (this.viewState === 'genre') {
        this.fetchMoviesByGenre();
      } else if (this.viewState === 'search') {
        this.search();
      }
    }
  }

  getDisplayedPages(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  // showMovieDetails(movie: any): void {
  //   const movieTitle = encodeURIComponent(
  //     movie.title.toLowerCase().replace(/ /g, '-')
  //   );
  //   this.router.navigate(['/movie', movieTitle]);
  // }
  showMovieDetails(movie: any) {
  this.router.navigate(['/movie', movie.id]);
}

  getLimitedWords(text: string, limit: number): string {
    if (!text) return '';
    const words = text.split(' ');
    return words.length <= limit
      ? text
      : words.slice(0, limit).join(' ') + '...';
  }
  changeLanguage() {
    const lang: string = this.LanguageService.getLanguage();

    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }

  getRatingColor(rate: number): string {
    if (rate >= 7) {
      return '#00ff88';
    } else if (rate >= 5) {
      return '#ffc107';
    } else {
      return '#dc3545';
    }
  }
}
