import { ShoppingCart } from './../models/shoppingcart';
import { Products } from './../models/products';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {

  @Input('product') product: Products;
  @Input('showActions') showActions: true;
  @Input('shoppingCart') shoppingCart: ShoppingCart;

  constructor( private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

}
