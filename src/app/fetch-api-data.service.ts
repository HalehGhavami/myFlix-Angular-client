import { Injectable } from '@angular/core';

// Imported modules to make HttpClient service work
import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://api-myflix.herokuapp.com/';

// The following decorator specifies that this services will be available in the root component
@Injectable({
  providedIn: 'root',
})
export class AppAPI {
  token: string | null = localStorage.getItem('token');

  // Inject HttpClient module to the constructor params

  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // 1 - ==================================================== User Registration
  // Register a User endpoint:apiUrl/users
  // Method: POST
  // Requires Authorization: No

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // 2 - ==================================================== User Login
  // User Login endpoint:apiUrl/login?userName="String"&password="String"
  // Method: POST
  // Requires Authorization: NO

  // Making the API call for the User Login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // 3 - ==================================================== All Movies
  // Get All Movies endpoint:apiUrl/movies
  // Method: GET
  // Requires Authorization: YES

  // Making the API call for the getAllMovies endpoint
  public getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.getToken()}`,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // 4 - ==================================================== Get one movie
  // Get All Movies endpoint: apiUrl/movies/[Title]
  // Method: GET
  // Requires Authorization: Yes

  // Making the API call for the getMovie endpoint
  public getMovie(Title: any): Observable<any> {
    return this.http
      .get(apiUrl + `movies/${Title}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.getToken()}`,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // 5 - ==================================================== Get Director
  // Get Director endpoint: apiUrl/movies//director/[Name]
  // Method: GET
  // Requires Authorization: Yes

  // Making the API call for the getDirector endpoint
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
  // Get Genre endpoint: apiUrl/movies/genres/[Genre]
  // Method: GET
  // Requires Authorization: Yes

  // Making the API call for the getGenre endpoint
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
  // Get User endpoint: apiUrl/users/[Username] (I HAVE TO ADD THIS RUOTE IN MY API!)
  // Method: GET
  // Requires Authorization: Yes

  // Making the API call for the getMovie endpoint
  public getUser(Username: any): Observable<any> {
    return this.http
      .get(apiUrl + `users/${Username}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.getToken()}`,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // 8 - ==================================================== Get Fav Movies from a User
  // Gets Fav Movies endpoint:apiUrl/users/[Username]/favorites (I HAVE TO ADD THIS RUOTE IN MY API!)
  // Method: GET
  // Requires Authorization: Yes

  // Making the API call for the getFavMovies endpoint
  public getFavMovies(Username: any): Observable<any> {
    return this.http
      .get(apiUrl + `users/${Username}/favorites`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.getToken()}`,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // 9 - ==================================================== Add Fav Movies to a User
  // Adds Fav Movie endpoint: apiUrl/users/[Username]/favorites/[MovieID]
  // Method: POST
  // Requires Authorization: Yes

  // Making the API call for the addFavMovie endpoint
  public addFavMovie(Username: any, MovieID: any): Observable<any> {
    return this.http
      .post(apiUrl + `users/${Username}/favorites/${MovieID}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.getToken()}`,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // 10 - ==================================================== Edit User
  // Edits endpoint: apiUrl/users/[Username]
  // Method: PUT
  // Requires Authorization: Yes

  // Making the API call for the EditUser endpoint
  public editUser(Username: string, userDetails: any): Observable<any> {
    return this.http
      .put(apiUrl + `users/${Username}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.getToken()}`,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // 11 - ==================================================== Delete User
  // Delete User endpoint: apiUrl/users/[Username]
  // Method: DELETE
  // Requires Authorization: Yes

  // Making the API call for the DeleteUser endpoint
  public deleteUser(Username: any): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${Username}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.getToken()}`,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // 12 - ==================================================== Delete Fav Movie
  // Deletes Fav Movie endpoint: apiUrl/users/[Username]/favorites/[MovieID]
  // Method: DELETE
  // Requires Authorization: Yes

  // Making the API call for the deleteFavMovie endpoint
  public deleteFavMovie(Username: any, MovieID: any): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${Username}/favorites/${MovieID}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.getToken()}`,
        }),
      })
      .pipe(catchError(this.handleError));
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
