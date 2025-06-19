import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { WishListService } from '../../services/wish-list-service';

@Injectable({ providedIn: 'root' })
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
    public router: Router,
    private route: ActivatedRoute,
    private movieService: MovieService,
    public wishListService: WishListService
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.term = params['q'];
      console.log(this.term);
      if (this.term) {
        this.loading = true;
        this.movieService
          .searchMoviesByTitle(this.term)
          .subscribe((results) => {
            console.log('response', results);
            this.movies = results;
            this.loading = false;
          });
      }
    });
  }
  getLimitedWords(text: string, limit: number): string {
    if (!text) return '';
    const words = text.split(' ');
    return words.length <= limit
      ? text
      : words.slice(0, limit).join(' ') + '...';
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

  toggleFavourite(movie: any) {
    if (this.wishListService.getWishList().find((m) => m.id === movie.id)) {
      this.wishListService.removeFromWishlist(movie.id);
    } else {
      this.wishListService.addToWishList(movie);
    }
  }

  isInWishlist(movie: any): boolean {
    return this.wishListService.getWishList().some((m) => m.id === movie.id);
  }
}
