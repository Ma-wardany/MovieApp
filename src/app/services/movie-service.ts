import { LanguageService } from './language-service';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey = 'a3943ad666db1690b61d20306eae783e';
  private language = 'en';
  private baseUrl =
    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&sort_by=popularity.desc';

  private searchUrl =
    'https://api.themoviedb.org/3/search/movie?include_adult=false';

  private genreUrl =
    'https://api.themoviedb.org/3/discover/movie?include_adult=false';

  private topratedmoviesUrl =
    'https://api.themoviedb.org/3/movie/top_rated?include_adult=false';

  private newarrivalsUrl =
    'https://api.themoviedb.org/3/movie/upcoming?include_adult=false';

  private actorMovies = 'https://api.themoviedb.org/3';

  constructor(
    private http: HttpClient,
    private LanguageService: LanguageService
  ) {}


  getMoviesByPage(page: number): Observable<any> {
    const url = `${this.baseUrl}&page=${page}&language=${this.LanguageService.getLanguage()}`;
    const headers = new HttpHeaders({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWMyNWIwZGEyZThjZTZjOGI0N2FhZmE2NDk1MGE1YyIsIm5iZiI6MTczNzA0ODY0Ny4xOSwic3ViIjoiNjc4OTQyNDc5NDdiMTlmNzhiOTc5YTY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.G4NMcUZKnbXllO-HVFZzHXkPzAyNw1kFpIFVUCV_S-s', // Replace with your actual API key
      accept: 'application/json',
    });
    return this.http.get<any>(url, { headers });
  }

  searchMoviesByTitle(q: string): Observable<any[]> {
    return this.http
      .get<any>('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: '559fbcf91eaa26a6ea82a05e056034ef',
          query: q,
          include_adult:false,
          language: this.LanguageService.getLanguage()
        },
      })
      .pipe(map((res) => res.results));
  }

  
  searchMovies(query: string, page: number = 1): Observable<any> {
    const url = `${this.searchUrl}&page=${page}&query=${encodeURIComponent(
      query
    )}&language=${this.LanguageService.getLanguage()}`;
    const headers = new HttpHeaders({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWMyNWIwZGEyZThjZTZjOGI0N2FhZmE2NDk1MGE1YyIsIm5iZiI6MTczNzA0ODY0Ny4xOSwic3ViIjoiNjc4OTQyNDc5NDdiMTlmNzhiOTc5YTY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.G4NMcUZKnbXllO-HVFZzHXkPzAyNw1kFpIFVUCV_S-s',
      accept: 'application/json',
    });
    return this.http.get<any>(url, { headers });
  }

  getMoviesByGenre(genreId: number, page: number = 1): Observable<any> {
    const url = `${
      this.genreUrl
    }&with_genres=${genreId}&page=${page}&language=${this.LanguageService.getLanguage()}`;
    const headers = new HttpHeaders({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWMyNWIwZGEyZThjZTZjOGI0N2FhZmE2NDk1MGE1YyIsIm5iZiI6MTczNzA0ODY0Ny4xOSwic3ViIjoiNjc4OTQyNDc5NDdiMTlmNzhiOTc5YTY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.G4NMcUZKnbXllO-HVFZzHXkPzAyNw1kFpIFVUCV_S-s',
      accept: 'application/json',
    });
    return this.http.get<any>(url, { headers });
  }

  getTopRatedMoviesByPage(page: number): Observable<any> {
    const url = `${
      this.topratedmoviesUrl
    }&page=${page}&language=${this.LanguageService.getLanguage()}`;
    const headers = new HttpHeaders({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWMyNWIwZGEyZThjZTZjOGI0N2FhZmE2NDk1MGE1YyIsIm5iZiI6MTczNzA0ODY0Ny4xOSwic3ViIjoiNjc4OTQyNDc5NDdiMTlmNzhiOTc5YTY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.G4NMcUZKnbXllO-HVFZzHXkPzAyNw1kFpIFVUCV_S-s', // Replace with your actual API key
      accept: 'application/json',
    });
    return this.http.get<any>(url, { headers });
  }

  getNewArrivalsByPage(page: number): Observable<any> {
    const url = `${
      this.newarrivalsUrl
    }&page=${page}&language=${this.LanguageService.getLanguage()}`;
    const headers = new HttpHeaders({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWMyNWIwZGEyZThjZTZjOGI0N2FhZmE2NDk1MGE1YyIsIm5iZiI6MTczNzA0ODY0Ny4xOSwic3ViIjoiNjc4OTQyNDc5NDdiMTlmNzhiOTc5YTY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.G4NMcUZKnbXllO-HVFZzHXkPzAyNw1kFpIFVUCV_S-s', // Replace with your actual API key
      accept: 'application/json',
    });
    return this.http.get<any>(url, { headers });
  }

  searchActor(actorName: string): Observable<any> {
  const url = `${this.actorMovies}/search/person?query=${encodeURIComponent(actorName)}&page=1&include_adult=false&language=${this.LanguageService.getLanguage()}`;
  const headers = new HttpHeaders({
    Authorization: 'Bearer <your_token>',
    accept: 'application/json',
  });
  return this.http.get<any>(url, { headers });
}


  getActorMovies(actorId: number): Observable<any> {
    const url = `${
      this.actorMovies
    }/person/${actorId}/movie_credits?include_adult=false&language=${this.LanguageService.getLanguage()}`;
    const headers = new HttpHeaders({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWMyNWIwZGEyZThjZTZjOGI0N2FhZmE2NDk1MGE1YyIsIm5iZiI6MTczNzA0ODY0Ny4xOSwic3ViIjoiNjc4OTQyNDc5NDdiMTlmNzhiOTc5YTY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.G4NMcUZKnbXllO-HVFZzHXkPzAyNw1kFpIFVUCV_S-s',
      accept: 'application/json',
    });
    return this.http.get<any>(url, { headers });
  }
  getMovieDetails(id: number): Observable<any> {
    return this.http.get(
      `${this.actorMovies}/movie/${id}?api_key=${this.apiKey}&language=${this.LanguageService.getLanguage()}`
    );
  }

  getRecommendations(id: number): Observable<any> {
    return this.http.get(
      `${this.actorMovies}/movie/${id}/recommendations?api_key=${this.apiKey}&language=${this.LanguageService.getLanguage()}`
    );
  }
}
