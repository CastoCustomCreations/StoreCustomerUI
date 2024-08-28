import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Product } from '../Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5050/api/products/';
  private productsUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  getProductsUpdateListener(): Observable<Product[]> {
    return this.productsUpdated.asObservable();
  }

  fetchProducts(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe((products) => {
      this.productsUpdated.next(products);
    });
  }
}
