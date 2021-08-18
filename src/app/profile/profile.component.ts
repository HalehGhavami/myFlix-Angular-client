import { Component, OnInit, Input } from '@angular/core';
import { AppAPI } from '../fetch-api-data.service';
import { Router } from '@angular/router';

// material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

//custom component
import { UserProfileUpdateComponent } from '../user-profile-update/user-profile-update.component';
import { UserProfileDeleteComponent } from '../user-profile-delete/user-profile-delete.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  user: any = {};
  movies: any[] = [];
  favorites: any = [];

  constructor(
    public fetchApiData: AppAPI,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    let FavoriteMovies = localStorage.getItem('FavoriteMovies');
    let Username = localStorage.getItem('user');
    let Email = localStorage.getItem('Email');
    let Birthday = localStorage.getItem('Birthday');

    this.user = {
      FavoriteMovies: FavoriteMovies,
      Username: Username,
      Email: Email,
      Birthday: Birthday,
    };
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.filterFavorites();
    });
  }

  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.user.FavoriteMovies.includes(movie._id)) {
        this.favorites.push(movie);
      }
    });
    return this.favorites;
  }

  removeFavorite(id: string, Title: string): void {
    this.fetchApiData.removeFavorite(id).subscribe((resp) => {
      console.log(resp);
      let favmovies = resp.FavoriteMovies;
      localStorage.setItem('FavoriteMovies', favmovies);
      this.snackBar.open(
        `${Title} has been removed from your favorites!`,
        'OK',
        {
          duration: 2000,
        }
      );
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    });
  }

  deleteUser(): void {
    this.dialog.open(UserProfileDeleteComponent);
  }

  editUser(): void {
    this.dialog.open(UserProfileUpdateComponent, {
      width: '400px',
    });
  }
}
