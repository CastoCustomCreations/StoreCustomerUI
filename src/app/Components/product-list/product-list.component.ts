import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Models/product.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';  // <-- Add this
import { Category } from '../../Models/category.model';
import { MatSliderModule } from '@angular/material/slider';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    FormsModule,  // <-- Add this
    MatDividerModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatSliderModule,
  ],

})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: { id: number; name: string }[] = []; // Assuming categories have id and name
  selectedCategory: string = '';
  minPrice = 0;
  maxPrice = 1000; // Adjust the maximum price as needed
  currentMinPrice = 0;
  currentMaxPrice = 1000;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = data; // Initialize filteredProducts with all products
      this.getProducts(); // Initialize filter products with price slider
    });

    this.productService.getProductsUpdateListener().subscribe((products: Product[]) => {
      this.products = products;
      this.filterProducts(); // Filter after updates
    });

    // Assuming there is a service method to get categories
    this.productService.getCategories().subscribe((data: Category[]) => {
      this.categories = data.map(category => ({
        id: Number(category.id),  // Convert `id` to a string
        name: category.name
      }));
    });
    this.products = this.products.filter(product => {
      return product.price >= this.currentMinPrice && product.price <= this.currentMaxPrice;
    });

  }

  goToProductDetails(productId: number): void {
    this.router.navigate(['/product-details', productId]);
  }

  // Filter products based on selected category and price range
  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const categoryMatch = !this.selectedCategory || product.categoryId === this.selectedCategory;
      const priceMatch = product.price >= this.currentMinPrice && product.price <= this.currentMaxPrice;
      return categoryMatch && priceMatch;
    });
  }

  // Event handler for category change
  onCategoryChange(): void {
    this.filterProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;

      this.maxPrice = Math.max(...products.map(p => p.price));
    });
  }

  onSliderChange(event: Event) {
    const slider = event.target as HTMLInputElement;
    this.currentMinPrice = +slider.value;
    this.currentMaxPrice = +slider.value;
    this.filterProducts();
  }

}
