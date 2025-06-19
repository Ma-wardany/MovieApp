import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie-service';

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
    private movieService: MovieService
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
}
