import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// Angular Material
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// Cutom Services
// This import brings in the API calls we created in 6.2
import { UserLoginService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}
  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    // show loading
    console.log('Loading');
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        // hide loading
        console.log('Done');
        // Logic for a successful login user goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        console.log(result);
        this.router.navigate(['movies']);
      },
      (err) => {
        console.log(err);
        this.snackBar.open(`Login error occured...`, 'OK');
      }
    );
  }
}
