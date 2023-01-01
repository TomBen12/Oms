import { Injectable } from '@angular/core';
import {User} from "../types/user.type.ts";
import {Order} from "../types/order.type.ts";
import {BehaviorSubject, Observable} from "rxjs";
import {Customer} from "../types/customer.type.ts";
import {ApiService} from "./api/api.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  id: number = 70
  loggedInUser: User | any = this.getEmptyUser()
  users: User[] = [
    // {
    //   id: 60,
    //   username: 'labmux',
    //   password: 'a',
    //   isAdmin:  true,
    //   icon: 'assets/icons/user-profile.icon.jpg'
    // },
    // {
    //   id: 63,
    //   username: 'Tom',
    //   password: 'Benitah',
    //   isAdmin:  true,
    //   icon: 'assets/icons/user-profile.icon.jpg'
    // },
    // {
    //   id: 65,
    //   username: 'Kate',
    //   password: 'Hunington',
    //   isAdmin:  false,
    //   icon: 'assets/icons/user-profile.icon.jpg'
    // },
    ]

  private _userLoggedinEvent = new BehaviorSubject<User | false>(this.loggedInUser)

  constructor(private api: ApiService) {
    this.loggedInUser = this.getEmptyUser()
  }


  logUserOut() {
    this.loggedInUser = false

  }

  public getloggedInUserEvent(): Observable<User | any> {
    return this._userLoggedinEvent.asObservable();
  }

  setLoggedInUser(user: User | false ) {
    this.loggedInUser = user
    this._userLoggedinEvent.next(this.loggedInUser)
  }

  getLoggedInUser(): User | any {
    return this.loggedInUser
  }

  deleteUser(id: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.api.deleteUser(id).subscribe(resp => {
        resolve(true)
      })
    })

  }


  createNewUser(username: string, password: string, isAdmin: boolean = false): Promise<User> {
    return new Promise<User>((resolve => {
      let newUser: User = {
        id: 0,
        username: username,
        password: password,
        icon: 'assets/icons/user-profile.icon.jpg',
        isAdmin: isAdmin
      }

      this.api.addUser(newUser).subscribe(resp => {
        console.log('setUsers subscribe ', resp);
        resolve(resp)
      })
    }))
  }


  getEmptyUser(): User {
    return {
      id: 0,
      username: '',
      password: '',
      isAdmin:  false
    }
  }

  getUsers(): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      this.api.getUsers().subscribe( users => {
        console.log('getUsers subscribe ', users);
        resolve(users)

      })
    })
  }

  getUser(id: number): Promise<User> {
    return new Promise<User>(resolve => {
      this.api.getUser(id).subscribe(u => {
        resolve(u)
      })
    })

  }
}
