import { AppAPI } from './../fetch-api-data.service';
import { Component, OnInit } from '@angular/core';

import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  //this array is where the movies returned from the API call will be kept there
  movies: any[] = [];

  constructor(
    public fetchApiData: AppAPI,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  // After implementing the function getMovies(), it's then called in the ngOnInit() lifecycle hook
  /**
   * On initialization {@link getMovies} will run
   * returning all the movies
   */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Retrieves all the movies from the database
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Retrieves info about a movie's genre
   * @param Name genre of movie
   * @param Description Description of the genre
   */
  genreDetails(Name: string, Description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { Name, Description },
    });
  }

  /**
   * Retrieves info about a movie's director
   * @param Name Name of the director
   * @param Bio Biography of the director
   * @param Birth Date of birth of the director
   * @param Death Date of death or N/A of the director
   */

  directorDetails(
    Name: string,
    Bio: string,
    Birth: string,
    Death: string
  ): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { Name, Bio, Birth, Death },
    });
  }

  /**
   * Retrieves synopsis of the movie
   * @param Title Title of the movie
   * @param ImagePath Image of the movie
   * @param Description summary of the movie
   * @param Director Director name of the movie
   * @param Genre Genre of the movie
   */
  synopsisDetails(
    Title: string,
    ImagePath: string,
    Description: string,
    Director: string,
    Genre: string
  ): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { Title, ImagePath, Description, Director, Genre },
    });
  }

  /**
   * Add movie to user favorite list
   * @param id The id of the favorite movie
   * @param Title Title of the favorite movie
   */
  addFavorite(id: string, Title: string): void {
    this.fetchApiData.addFavorite(id).subscribe((resp: any) => {
      console.log(resp);
      let favmovies = resp.FavoriteMovies;
      localStorage.setItem('FavoriteMovies', favmovies);
      this.snackBar.open(
        `${Title} has been added to your favorite movies list`,
        'OK',
        {
          duration: 2000,
        }
      );
    });
  }
}
