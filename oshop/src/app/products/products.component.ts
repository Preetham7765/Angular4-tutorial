import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../shopping-cart.service';
import { Products } from './../models/products';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { ShoppingCart } from '../models/shoppingcart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Products[] = [];
  filteredProducts: Products[];
  category: string;
  cart$: Observable<ShoppingCart>;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) {

    }

    async ngOnInit() {
      this.cart$ = await this.shoppingCartService.getCart();
       this.populateProducts();
    }

    private applyFilter() {
      this.filteredProducts = (this.category) ? this.products.filter( p => p.category === this.category) :
              this.products;
    }

    private populateProducts() {
      this.productService
      .getAll()
        .switchMap(products => {
          this.products = products;
          return this.route.queryParamMap;
        })
        .subscribe( params => {
            this.category = params.get('category');
            this.applyFilter();

            } );
    }

}
