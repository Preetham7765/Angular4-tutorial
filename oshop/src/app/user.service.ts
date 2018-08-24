import { AppUser } from './models/app.users';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }
  save(user: firebase.User) {

    this.db.object('/users/' + user.uid).update( {
      name: user.displayName,
      email: user.email
    });

  }

  get(uid: String): FirebaseObjectObservable<AppUser> {
    console.log(uid);
    return this.db.object('/users/' + uid);
  }

}
