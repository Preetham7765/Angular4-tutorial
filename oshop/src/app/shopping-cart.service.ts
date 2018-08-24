import { CategoryService } from './category.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from './models/shoppingcart';
import { Products } from './models/products';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operator/take';
import { map } from 'rxjs/operator/map';

@Injectable()
export class ShoppingCartService {

  constructor( private db: AngularFireDatabase) {

   }


  async clearCart() {
    let cartId$ = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId$ + '/items').remove();
  }

  private create() {
     return this.db.list('/shopping-carts').push( {
      dateCreated: new Date().getTime(),
     });
   }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
    .map(x => new ShoppingCart(x.items));
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {

    let cartID = localStorage.getItem('cartID');
    if (cartID) return cartID;

    let result = await this.create();
    localStorage.setItem('cartID', result.key);
    return result.key;

   }

   private async updateItem(product: Products, change: Number) {
    let cartId = await this.getOrCreateCartId();
    let items$= this.getItem(cartId, product.$key);
    items$.take(1).subscribe( item => {
      let quantity = (item.quantity || 0) + change;
      if (quantity === 0) { items$.remove(); } else {
        items$.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
        });
      }
    });
   }

   addToCart(product: Products) {
    this.updateItem(product, 1);

   }

   removeFromCart(product: Products) {
    this.updateItem(product, -1);
   }
}
