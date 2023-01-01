import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Order} from "../../types/order.type.ts";
import {Observable} from "rxjs";
import {User} from "../../types/user.type.ts";
import {Customer} from "../../types/customer.type.ts";
import {ApiLib} from "./lib/api-lib";

@Injectable({
  providedIn: 'root'
})
export class ApiService extends ApiLib{

  url = 'http://localhost:5125/api'

  body = {}
  constructor(private http: HttpClient) {
    super()
  }


  /**
   * Orders
   */
  addOrder(order: Order): Observable<any> {
    console.log('addOrder api call', order);

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(this.url + '/orders', order, { headers } )
  }
  getOrders(): Observable<any> {
    console.log('getOrders api call');

    return this.http.get(this.url + '/orders')
  }
  getOrder(id: number): Observable<any> {
    console.log('getOrder api call', id);

    return this.http.get(this.url + '/orders/' + id)
  }
  deleteOrder(id: number):  Observable<any> {
    console.log('deleteOrder api call', id);


    // const headers = new HttpHeaders().set('Content-Type', 'application/json').set('accept', 'text/plain')
    const headers = { 'Content-Type': 'application/json','Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' }

    return this.http.delete(this.url + '/orders/' + id)
  }

  /**
   * Users
   */
  addUser(user: User):  Observable<any> {
    console.log('addUser api call');

    // const headers = new HttpHeaders().set('Content-Type', 'application/json').set('accept', 'text/plain')
    const headers = { 'Content-Type': 'application/json' }

    return this.http.post(this.url + '/users', user, { headers })
  }
  getUsers():  Observable<any> {
    console.log('getUsers api call');

    return this.http.get(this.url + '/users')
  }
  getUser(id: number):  Observable<any> {
    console.log('getUser api call', id);

    return this.http.get(this.url + '/users/' + id)
  }

  deleteUser(id: number):  Observable<any> {

    console.log('deleteUser api call', id);
    // const headers = new HttpHeaders().set('Content-Type', 'application/json').set('accept', 'text/plain')
    const headers = { 'Content-Type': 'application/json','Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' }

    return this.http.delete(this.url + '/users/' + id)
  }


  /**
   * Customers
   */
  addCustomer(customer: Customer):  Observable<any> {
    console.log('addCustomer api call', customer);

    // const headers = new HttpHeaders().set('Content-Type', 'application/json').set('accept', 'text/plain')
    const headers = { 'Content-Type': 'application/json' }

    customer.orders = JSON.stringify(customer.orders)

    return this.http.post(this.url + '/customers', customer, { headers })
  }
  getCustomers():Observable<any> {
    console.log('getCustomers api call');

    return this.http.get(this.url + '/customers')
  }
  getCustomer(id: number):  Observable<any> {
    console.log('getCustomer api call', id);

    return this.http.get(this.url + '/customers/' + id)
  }
  deleteCustomer(id: number):  Observable<any> {

    console.log('deleteCustomer api call', id);
    // const headers = new HttpHeaders().set('Content-Type', 'application/json').set('accept', 'text/plain')
    const headers = { 'Content-Type': 'application/json' }

    return this.http.delete(this.url + '/customers/' + id)
  }
}
