import { ShoppingCart } from './../models/shoppingcart';
import { Products } from './../models/products';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product: Products;
  @Input('shoppingCart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

}
