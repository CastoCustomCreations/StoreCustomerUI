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
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';  // <-- Add this
import { Category } from '../../Models/category.model';
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
    MatSliderModule
  ],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: { id: number; name: string }[] = []; // Assuming categories have id and name
  selectedCategory: string = '';
  priceRange: number[] = [0, 1000]; // Default price range (adjust according to your use case)
  minPrice: number = 0;
  maxPrice: number = 1000;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = data; // Initialize filteredProducts with all products
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
  }

  goToProductDetails(productId: number): void {
    this.router.navigate(['/product-details', productId]);
  }

  // Filter products based on selected category and price range
  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const categoryMatch = !this.selectedCategory || product.categoryId === this.selectedCategory;
      const priceMatch = product.price >= this.priceRange[0] && product.price <= this.priceRange[1];
      return categoryMatch && priceMatch;
    });
  }

  // Event handler for category change
  onCategoryChange(): void {
    this.filterProducts();
  }

  // Event handler for price range change
  onPriceChange(event: any): void {
    this.priceRange = event.value;
    this.filterProducts();
  }
}
