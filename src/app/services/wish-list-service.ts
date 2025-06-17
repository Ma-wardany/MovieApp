import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  private movieWishList: any[] = [];

  getWishList()
  {
    return this.movieWishList;
  }

  addToWishList(movie: any)
  {
    if(!this.movieWishList.find(m => m.id == movie.id))
    {
      this.movieWishList.push(movie);
    }
  }

    removeFromWishlist(id: number) {
    this.movieWishList = this.movieWishList.filter(m => m.id !== id);
  }
}
