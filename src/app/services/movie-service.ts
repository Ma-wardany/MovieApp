import { LanguageService } from './language-service';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseUrl = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc';

  private searchUrl = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US';

  private genreUrl = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US';

  private topratedmoviesUrl = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US'

  private newarrivalsUrl = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US'

  private actorMovies = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient ,private LanguageService:LanguageService) { }

  
  // Add a page parameter to dynamically request movies for the given page
  getMoviesByPage(page: number ): Observable<any> {
  
    const url = `${this.baseUrl}&page=${page}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWMyNWIwZGEyZThjZTZjOGI0N2FhZmE2NDk1MGE1YyIsIm5iZiI6MTczNzA0ODY0Ny4xOSwic3ViIjoiNjc4OTQyNDc5NDdiMTlmNzhiOTc5YTY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.G4NMcUZKnbXllO-HVFZzHXkPzAyNw1kFpIFVUCV_S-s',  // Replace with your actual API key
      'accept': 'application/json'
    });
    return this.http.get<any>(url, { headers });
  }


    // Function to search movies based on the query and page number
    searchMovies(query: string, page: number = 1): Observable<any> {
      const url = `${this.searchUrl}&page=${page}&query=${encodeURIComponent(query)}&language=${this.LanguageService.getLanguage()}`;
      const headers = new HttpHeaders({
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWMyNWIwZGEyZThjZTZjOGI0N2FhZmE2NDk1MGE1YyIsIm5iZiI6MTczNzA0ODY0Ny4xOSwic3ViIjoiNjc4OTQyNDc5NDdiMTlmNzhiOTc5YTY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.G4NMcUZKnbXllO-HVFZzHXkPzAyNw1kFpIFVUCV_S-s',  
        'accept': 'application/json'
      });
      return this.http.get<any>(url, { headers });
    }

    getMoviesByGenre(genreId: number, page: number = 1): Observable<any> {
      const url = `${this.genreUrl}&with_genres=${genreId}&page=${page}&language=${this.LanguageService.getLanguage()}`;
      const headers = new HttpHeaders({
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWMyNWIwZGEyZThjZTZjOGI0N2FhZmE2NDk1MGE1YyIsIm5iZiI6MTczNzA0ODY0Ny4xOSwic3ViIjoiNjc4OTQyNDc5NDdiMTlmNzhiOTc5YTY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.G4NMcUZKnbXllO-HVFZzHXkPzAyNw1kFpIFVUCV_S-s',  
        'accept': 'application/json'
      });
      return this.http.get<any>(url, { headers });
    }


    getTopRatedMoviesByPage(page: number): Observable<any> {
      const url = `${this.topratedmoviesUrl}&page=${page}&language=${this.LanguageService.getLanguage()}`;
      const headers = new HttpHeaders({
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWMyNWIwZGEyZThjZTZjOGI0N2FhZmE2NDk1MGE1YyIsIm5iZiI6MTczNzA0ODY0Ny4xOSwic3ViIjoiNjc4OTQyNDc5NDdiMTlmNzhiOTc5YTY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.G4NMcUZKnbXllO-HVFZzHXkPzAyNw1kFpIFVUCV_S-s',  // Replace with your actual API key
        'accept': 'application/json'
      });
      return this.http.get<any>(url, { headers });
    }
  
    getNewArrivalsByPage(page: number): Observable<any> {
      const url = `${this.newarrivalsUrl}&page=${page}&language=${this.LanguageService.getLanguage()}`;
      const headers = new HttpHeaders({
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWMyNWIwZGEyZThjZTZjOGI0N2FhZmE2NDk1MGE1YyIsIm5iZiI6MTczNzA0ODY0Ny4xOSwic3ViIjoiNjc4OTQyNDc5NDdiMTlmNzhiOTc5YTY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.G4NMcUZKnbXllO-HVFZzHXkPzAyNw1kFpIFVUCV_S-s',  // Replace with your actual API key
        'accept': 'application/json'
      });
      return this.http.get<any>(url, { headers });
    }


    searchActor(actorName: string): Observable<any> {
      const url = `${this.actorMovies}/search/person?query=${encodeURIComponent(
        actorName
      )}&include_adult=false&language=en-US&page=1&language=${this.LanguageService.getLanguage()}`;
      const headers = new HttpHeaders({
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWMyNWIwZGEyZThjZTZjOGI0N2FhZmE2NDk1MGE1YyIsIm5iZiI6MTczNzA0ODY0Ny4xOSwic3ViIjoiNjc4OTQyNDc5NDdiMTlmNzhiOTc5YTY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.G4NMcUZKnbXllO-HVFZzHXkPzAyNw1kFpIFVUCV_S-s',  
        'accept': 'application/json'
      });
      return this.http.get<any>(url, { headers});
    }
  
 
  getActorMovies(actorId: number): Observable<any> {
    const url = `${this.actorMovies}/person/${actorId}/movie_credits?&language=${this.LanguageService.getLanguage()}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWMyNWIwZGEyZThjZTZjOGI0N2FhZmE2NDk1MGE1YyIsIm5iZiI6MTczNzA0ODY0Ny4xOSwic3ViIjoiNjc4OTQyNDc5NDdiMTlmNzhiOTc5YTY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.G4NMcUZKnbXllO-HVFZzHXkPzAyNw1kFpIFVUCV_S-s',  
      'accept': 'application/json'
    });
    return this.http.get<any>(url, { headers});
  }

}



