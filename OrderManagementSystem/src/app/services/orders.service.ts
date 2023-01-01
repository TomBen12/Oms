import { Injectable } from '@angular/core';
import {Order} from "../types/order.type.ts";
import {Customer} from "../types/customer.type.ts";
import {CustomersService} from "./customers.service";
import {User} from "../types/user.type.ts";
import {ApiService} from "./api/api.service";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  id: number = 4

  orders: Order[] = [
    // {
    //   id: 1,
    //   name: '65" Samsung TV',
    //   price: 799,
    //   customerId: 11
    // },
    // {
    //   id: 2,
    //   customerId: 22,
    //   name: 'Standing Desk',
    //   price: 395
    // },
    // {
    //   id: 3,
    //   customerId: 33,
    //   name: 'Live Love Laugh Poster',
    //   price: 65
    // },
  ]

  constructor(private customersService: CustomersService,
              private api: ApiService) { }

  addDefaultOrders() {
    return new Promise<Order[]>((resolve, reject) => {
      let defaultOrders = [
        {
          id: 1,
          name: '65" Samsung TV',
          price: 799,
          customerId: 11
        },
        {
          id: 2,
          customerId: 22,
          name: 'Standing Desk',
          price: 395
        },
        {
          id: 3,
          customerId: 33,
          name: 'Live Love Laugh Poster',
          price: 65
        },
      ]

      this.api.addOrder(defaultOrders[0]).subscribe(orders => {
        this.api.addOrder(defaultOrders[1]).subscribe(orders => {
          this.api.addOrder(defaultOrders[2]).subscribe(orders => {
            resolve(orders)
          })
        })
      })
    })
  }

  getOrders(): Promise<Order[]> {
    return new Promise<Order[]>((resolve, reject) => {
      this.api.getOrders().subscribe(orders => {
        console.log('getOrders ', orders);
        resolve(orders)
      })
    })
  }

  deleteOrder(orderId: number, customerId: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.customersService.removeOrderFromCustomer(customerId, orderId).then(resp => {
        console.log('removeOrderFromCustomer ', resp);
        this.api.deleteOrder(orderId).subscribe(resp => {
          resolve(true)

        })
      })

    })

  }

  getOrder(id: number): Promise<Order> {
    return new Promise<Order>((resolve, reject) => {
      this.api.getOrder(id).subscribe(order => {
        console.log('getOrder ', order);
        resolve(order)
      })
    })
  }

  addOrder(order: Order): void {
    this.orders.push(order)
  }

  /**
   * Creates new order and adds it to the orders array. Also adds it to the customers array
   * @param customerId
   * @param name
   * @param price
   */
  createNewOrder(customerId: number, name: string, price: number): Promise<Order> {
    return new Promise<Order>(resolve => {
      let newOrder: Order = {
        id: 0,
        customerId: customerId,
        name: name,
        price: price,
      }

      this.api.addOrder(newOrder).subscribe( order => {
        console.log('addOrder ', order);

        //todo update customer or delete and readd customer for now
        this.customersService.addOrder(customerId, order).then(r => {

          resolve(order)

        })

      })
    })

  }

  getEmptyOrder(): Order {
    return {
      id: 0,
      customerId: 0,
      name: '',
      price: 0,
    }
  }

  getNewId(): number {

    this.id = this.id + 1
    return this.id
  }
}
