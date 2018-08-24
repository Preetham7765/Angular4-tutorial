import { Products } from './../../models/products';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Products[];
  filteredProducts: any [];
  subscription: Subscription;

  constructor(private productService: ProductService) {

    this.subscription = this.productService.getAll()
    .subscribe(products => this.filteredProducts = this.products = products);
  }

   filter(query: string) {

    console.log(query);
    this.filteredProducts =   (query) ?
      this.products.filter( p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
    console.log(this.filteredProducts);
   }

   ngOnDestroy() {
    this.subscription.unsubscribe();

   }

  ngOnInit() {
  }

}
