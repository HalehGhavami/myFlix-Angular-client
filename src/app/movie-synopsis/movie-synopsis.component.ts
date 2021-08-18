import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-movie-synopsis',
  templateUrl: './movie-synopsis.component.html',
  styleUrls: ['./movie-synopsis.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MovieSynopsisComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      ImagePath: string;
      Description: string;
      Director: string;
      Genre: string;
    }
  ) {}

  ngOnInit(): void {}
}
