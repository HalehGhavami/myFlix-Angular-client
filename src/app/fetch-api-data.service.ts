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

@Injectable({
  providedIn: 'root',
})


