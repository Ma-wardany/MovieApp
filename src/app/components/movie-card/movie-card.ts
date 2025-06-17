import { Component, Input } from '@angular/core';
import { WishListService } from '../../services/wish-list-service';

@Component({
  selector: 'app-movie-card',
  standalone: false,
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css'
})
export class MovieCard {

  @Input() movie: any = {};
  @Input() isFavourite: boolean = false;

  constructor(private _wishListService: WishListService) { }


  toggleFavourite()
  {
    if(this.isFavourite)
      this._wishListService.removeFromWishlist(this.movie.id)
    else
      this._wishListService.addToWishList(this.movie);

    this.isFavourite = !this.isFavourite
  }
}
