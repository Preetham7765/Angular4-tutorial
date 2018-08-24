import { ShoppingCart } from './../models/shoppingcart';
import { OrderService } from './../order.service';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Order } from './../models/order';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping = {};
  userSubscription: Subscription;
  userId: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    ) {}

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.storeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
  ngOnInit() {

    this.userSubscription = this.authService.user$.subscribe( user => this.userId = user.uid);
  }

  ngOnDestroy () {


    this.userSubscription.unsubscribe();

  }

}
