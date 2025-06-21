import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../models/Movie';
import { MovieService } from '../../services/movie-service';
import { WishListService } from '../../services/wish-list-service';
import { LanguageService } from '../../services/language-service';

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
currentLang:string=''
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    public wishListService: WishListService,
    public LanguageService:LanguageService
  ) {}

  ngOnInit(): void {
     // Get movie ID from route 
  this.route.paramMap.subscribe(params => {
    this.movieId = Number(params.get('id'));

    this.loadData(); 
  });

// subscribe to language change events
  this.LanguageService.language.subscribe(lang => {
    this.currentLang=lang
    this.changeLanguageDirection();
    this.loadData(); 
  });
}

// fetch both movie details and recommendations
loadData() {
  this.fetchMovieDetails();
  this.fetchRecommendations();
}
//change page direction based on selected language
changeLanguageDirection(): void {
    document.documentElement.dir =
      this.LanguageService.getLanguage() === 'ar' ? 'rtl' : 'ltr';
  }


  // fetch movie details from API

  fetchMovieDetails() {
  this.movieService.getMovieDetails(this.movieId).subscribe(res => {
    console.log('Movie Details:', res);
    this.movie = res;
  }, err => {
    console.error('Error fetching movie:', err);
  });
}
// fetch recommended movies for this movie
  fetchRecommendations() {
    this.movieService.getRecommendations(this.movieId).subscribe(res => {
      this.recommendations = res.results;
    });
  }
// Toggle the movie in/from the wishlist
  toggleFavourite(movie: any) {
    if (this.wishListService.getWishList().find(m => m.id === movie.id)) {
      this.wishListService.removeFromWishlist(movie.id);
    } else {
      this.wishListService.addToWishList(movie);
    }
  }

  // Check if a movie is  in the wishlist
  isInWishlist(movie: any): boolean {
    return this.wishListService.getWishList().some(m => m.id === movie.id);
  }

 

}
