import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomerSignUpComponent } from "./Components/customer-sign-up/customer-sign-up.component";
import { HeaderComponent } from "./Components/header/header.component";
import { GlobalBannerComponent } from "./Components/global-banner/global-banner.component";
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ContactFormComponent } from "./Components/contact-form/contact-form.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomerSignUpComponent, HeaderComponent, GlobalBannerComponent, ProductListComponent, ContactFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'StoreCustomerUI';
}
