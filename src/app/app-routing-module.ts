import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './components/home/home';
import { WishList } from './components/wish-list/wish-list';
import { SearchResult } from './components/search-result/search-result';
import { MovieDetails } from './components/movie-details/movie-details';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'wish-list', component: WishList },
  { path: 'search-result', component: SearchResult },
  { path: 'movie/:id', component: MovieDetails }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
