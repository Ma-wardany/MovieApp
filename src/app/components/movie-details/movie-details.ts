import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../models/Movie';
import { MovieService } from '../../services/movie-service';
import { WishListService } from '../../services/wish-list-service';

@Component({
  selector: 'app-movie-details',
  standalone: false,
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css'
})
export class MovieDetails implements OnInit {
movieId!: number;
  movie: Movie | null = null;
  recommendations: Movie[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    public wishListService: WishListService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.movieId = Number(params.get('id'));
      this.fetchMovieDetails();
      this.fetchRecommendations();
    });
  }

  fetchMovieDetails() {
  this.movieService.getMovieDetails(this.movieId).subscribe(res => {
    console.log('Movie Details:', res);
    this.movie = res;
  }, err => {
    console.error('Error fetching movie:', err);
  });
}

  fetchRecommendations() {
    this.movieService.getRecommendations(this.movieId).subscribe(res => {
      this.recommendations = res.results;
    });
  }

  toggleFavourite(movie: any) {
    if (this.wishListService.getWishList().find(m => m.id === movie.id)) {
      this.wishListService.removeFromWishlist(movie.id);
    } else {
      this.wishListService.addToWishList(movie);
    }
  }

  isInWishlist(movie: any): boolean {
    return this.wishListService.getWishList().some(m => m.id === movie.id);
  }

}
