import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../models/app.users';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shoppingcart';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor (private authService: AuthService,
               private shoppingCartService: ShoppingCartService)  {}

  async ngOnInit() {
    this.authService.appUser$.subscribe( appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.authService.logout();
  }

}
