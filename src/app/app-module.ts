import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { MovieDetails } from './components/movie-details/movie-details';
import { MovieCard } from './components/movie-card/movie-card';
import { SearchResult } from './components/search-result/search-result';
import { WishList } from './components/wish-list/wish-list';

@NgModule({
  declarations: [
    App,
    Navbar,
    Home,
    MovieDetails,
    MovieCard,
    SearchResult,
    WishList
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
