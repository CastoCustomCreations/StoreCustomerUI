// src/app/services/customer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../Models/customer.model';
import { environment } from '../environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = `${environment.apiUrl}/Customers`;

  constructor(private http: HttpClient) { }

  addCustomer(customer: Customer): Promise<Customer> {
    return lastValueFrom(this.http.post<Customer>(this.apiUrl, customer));
  }
}
