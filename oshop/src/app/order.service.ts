import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private cartSerice: ShoppingCartService) {}


   async storeOrder(order) {
     let result = await this.db.list('/orders').push(order);
     this.cartSerice.clearCart();
     return result;

   }

}
