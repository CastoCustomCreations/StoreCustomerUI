import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerSignUpComponent } from '../customer-sign-up/customer-sign-up.component';[]
import { relative } from 'path';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) {}

  openSignUp() {
    this.dialog.open(CustomerSignUpComponent, {
      width: '500px', // Adjust width as needed
      height: '500px', // Adjust height as needed

    });

}
}
