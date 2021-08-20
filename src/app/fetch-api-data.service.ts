import { Injectable } from '@angular/core';

// Imported modules to make HttpClient service work
import { catchError } from 'rxjs/internal/operators';

import { Router } from '@angular/router';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/** This variable contains the URL for the API */
const apiUrl = 'https://api-myflix.herokuapp.com/';

// The following decorator specifies that this services will be available in the root component
@Injectable({
  providedIn: 'root',
})
export class AppAPI {
  /**Injecting the HttpClient module to the constructor params will provide
   * HttpClient to the entire class, making it available via this.http
   */
  constructor(private http: HttpClient, private router: Router) {}
  // Non-typed response extraction
  private extractResponseData(res: Response | {}): Response | {} {
    console.log(res);
    const body = res;
    return body || {};
  }

  // 1 - ==================================================== User Registration
  // Method: POST
  // Requires Authorization: No

  /**
   * Register a User endpoint:apiUrl/users
   * @returns Adds a new user to the database
   * @param userDetails An object containing the user's inputted info
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // 2 - ==================================================== User Login
  // Method: POST
  // Requires Authorization: NO

  /**
   * User Login endpoint:apiUrl/login?userName="String"&password="String"
   * @returns Returns whether or not a user has been authenticated
   * @param userDetails An object containing the user's inputted info (password
   * and username)
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // 3 - ==================================================== All Movies
  // Method: GET
  // Requires Authorization: YES

  /**
   * Making the API call for the getAllMovies endpoint:apiUrl/movies
   * @returns Returns a list of all the movies in the database
   */
  public getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.getToken()}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // 4 - ==================================================== Get one movie synopsis by Title
  // Method: GET
  // Requires Authorization: Yes

  /**
   * Making the API call for the getMovie endpoint: apiUrl/movies/[Title]
   * @returns Returns a movie's data selected by title
   * @param Title An object containing the movie's title
   */
  public getMovieByTitle(Title: any): Observable<any> {
    return this.http
      .get(apiUrl + `movies/${Title}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.getToken()}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // 5 - ==================================================== Get Director
  // Method: GET
  // Requires Authorization: Yes

  /**
   * Making the API call for the getDirector endpoint: apiUrl/movies/director/[Name]
   * @returns Returns the director data
   * @param Name An object containing the director's name
   */
  public getDirector(Name: any): Observable<any> {
    return this.http
      .get(apiUrl + `/movies/director/${Name}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.getToken()}`,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // 6 - ==================================================== Get Genre
  // Method: GET
  // Requires Authorization: Yes

  /**
   * Making the API call for the getGenre endpoint: apiUrl/movies/genres/[Genre]
   * @returns Returns the genre info
   * @param Genre An object containing the movie's genre/title
   */
  public getGenre(Genre: any): Observable<any> {
    return this.http
      .get(apiUrl + `movies/genres/${Genre}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.getToken()}`,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // 7 - ==================================================== Get User info
  // Method: GET
  // Requires Authorization: Yes

  //
  /**
   * Making the API call for the getMovie endpoint: apiUrl/users/[Username]
   * @returns Returns the user's data
   * @param Username An object containing the user's name
   */
  public getUser(Username: any): Observable<any> {
    return this.http
      .get(apiUrl + `users/${Username}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.getToken()}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // 8 - ==================================================== Get Fav Movies from a User
  // Gets Fav Movies endpoint:apiUrl/users/[Username]/favorites (I HAVE TO ADD THIS RUOTE IN MY API!)
  // Method: GET
  // Requires Authorization: Yes

  // // Making the API call for the FavouriteMovie endpoint
  // public getFavouriteMovie(Username: any): Observable<any> {
  //   return this.http
  //     .get(apiUrl + `users/${Username}/favorites`, {
  //       headers: new HttpHeaders({
  //         Authorization: `Bearer ${this.getToken()}`,
  //       }),
  //     })
  //     .pipe(catchError(this.handleError));
  // }

  // 9 - ==================================================== Add Fav Movies to a User
  // Method: POST
  // Requires Authorization: Yes

  /**
   * Adds FavouriteMovie endpoint: apiUrl/users/[Username]/favorites/[MovieID]
   * @returns Returns an array of the movies favoured
   * @param id The id of the selected movie
   */
  public addFavorite(id: string): Observable<any> {
    const Username = localStorage.getItem('user');
    return this.http
      .post(apiUrl + `users/${Username}/favorites/${id}`, id, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.getToken()}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // 10 - ==================================================== Edit User
  // Method: PUT
  // Requires Authorization: Yes

  /**
   * Enables a user to update their user data, Edits endpoint: apiUrl/users/[Username]
   * @returns The updated data of the user
   * @param userDetails An object containing a user's details
   */
  public editUser(userDetails: any): Observable<any> {
    const Username = localStorage.getItem('user');
    return this.http
      .put(apiUrl + `users/${Username}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.getToken()}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // 11 - ==================================================== Delete User
  // Method: DELETE
  // Requires Authorization: Yes

  /**
   * Allows a user to delete their account, endpoint: apiUrl/users/[Username]
   */
  public deleteUser(): Observable<any> {
    const Username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${Username}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.getToken()}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // 12 - ==================================================== Delete Fav Movie
  // Method: DELETE
  // Requires Authorization: Yes

  /**
   * Removes a movie to the favoured movies list, endpoint: apiUrl/users/[Username]/favorites/[MovieID]
   * @returns Returns an array of the movies favoured
   * @param id The id of the selected movie
   */
  public removeFavorite(id: string): Observable<any> {
    const Username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${Username}/favorites/${id}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.getToken()}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private getToken(): string {
    const token = localStorage.getItem('token')!;
    return token;
  }

  // Error Handeling
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(`Something bad happened; Please try again.`);
  }
}
