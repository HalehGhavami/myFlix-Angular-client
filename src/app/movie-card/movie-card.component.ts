import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  //this array is where the movies returned from the API call will be kept there
  movies: any[] = [];
  constructor(public fetchApiData: GetAllMoviesService) {}

  // After implementing the function getMovies(), it's then called in the ngOnInit() lifecycle hook
  ngOnInit(): void {
    this.getMovies();
  }

  //fetch the movies from the GetAllMoviesService with the help of getAllMovies()
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
}
