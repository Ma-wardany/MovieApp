import { Component } from '@angular/core';
import { WishListService } from '../../services/wish-list-service';

@Component({
  selector: 'app-wish-list',
  standalone: false,
  templateUrl: './wish-list.html',
  styleUrl: './wish-list.css'
})
export class WishList {
  constructor(private _wishListService: WishListService) {}

  getWishList() {
    return this._wishListService.getWishList();
  }

  removeFromWishList(id: number) {
    this._wishListService.removeFromWishlist(id);
  }

  getStarsArray(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < rating);
  }

  setRating(movie: any, rating: number): void {
    movie.rating = rating;

    // Optional: persist the change if service supports it
    // this._wishListService.updateRating(movie.id, rating);
  }
}
