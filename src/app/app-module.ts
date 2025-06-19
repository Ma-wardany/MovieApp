import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { MovieDetails } from './components/movie-details/movie-details';
import { MovieCard } from './components/movie-card/movie-card';
import { SearchResult } from './components/search-result/search-result';
import { WishList } from './components/wish-list/wish-list';
import { FormsModule } from '@angular/forms';


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
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient() 
  ],
  bootstrap: [App]
})
export class AppModule { }
