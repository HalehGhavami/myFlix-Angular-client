import { Component, OnInit } from '@angular/core';

// Custom Components
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

// Angular Material Imports
import { MatDialog } from '@angular/material/dialog';

/*
  Component Decorator
*/
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
/*
  Component
*/
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}
  // This is the function that will open the dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '280px',
    });
  }

  // Directs to login modal
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // Assigning the dialog a width
      width: '280px',
    });
  }
}
