import { MovieService } from './movie-service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class WishListService {

 private movieWishList = new BehaviorSubject<any[]>([]);

  wishList$ = this.movieWishList.asObservable();
  
constructor(private MovieService:MovieService){

}


  getWishList(): any[] {
    return this.movieWishList.getValue();
  }

  refetchWishListMovies() {
    const ids = this.getWishList().map(movie => movie.id);

    const requests = ids.map(id =>this.MovieService.getMovieDetails(id));

    forkJoin(requests).subscribe(updatedMovies => {this.movieWishList.next(updatedMovies);},
      error => {
        console.error('Error updating wishlist movies:', error);
      }
    );
  }

  addToWishList(movie: any) {
    if (!this.movieWishList.getValue().find((m) => m.id == movie.id)) {
       this.movieWishList.next([...this.movieWishList.getValue(), movie])
      console.log("added");

      for(let m of this.movieWishList.getValue())
      {
        console.log(m);

      }

    }
  }

  removeFromWishlist(id: number) {
     this.movieWishList.next(this.getWishList().filter((m) => m.id !== id))
    console.log("removed");
    console.log(this.movieWishList);
  }
}
