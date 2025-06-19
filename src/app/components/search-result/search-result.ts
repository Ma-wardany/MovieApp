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

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    public wishListService: WishListService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const q = params['q']?.trim() || '';
      this.term = q;
      if (q) {
        this.loading = true;
        // Adjust service call if method name differs; e.g. searchMoviesByTitle or searchMovies
        this.movieService
          .searchMoviesByTitle(q)  // or .searchMovies(q, 1) depending on your API
          .subscribe({
            next: (results) => {
              this.movies = results;
              this.loading = false;
            },
            error: (err) => {
              console.error('Search API Error:', err);
              this.movies = [];
              this.loading = false;
            }
          });
      } else {
        this.movies = [];
      }
    });
  }
}
