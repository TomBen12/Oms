import { Injectable } from '@angular/core';
import {Customer} from "../types/customer.type.ts";
import {Order} from "../types/order.type.ts";
import {User} from "../types/user.type.ts";
import {ApiService} from "./api/api.service";
import {resolve} from "@angular/compiler-cli";

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  id = 44
  customers: Customer[] = []

  constructor(private api: ApiService) { }

  addDefaultCustomers() {
    return new Promise<Order[]>((resolve, reject) => {
      let defaultCustomers = [
        {
          id: 11,
          firstname: 'John',
          lastname: 'Doe',
          email: 'john.doe@gmail.com',
          icon: 'https://mdbootstrap.com/img/new/avatars/8.jpg',
          orders: [
            {
              id: 1,
              customerId: 11,
              name: '65" Samsung TV',
              price: 799,
            }
          ]
        },
        {
          id: 22,
          firstname: 'Alex',
          lastname: 'Ray',
          email: 'alex.ray@gmail.com',
          icon: 'https://mdbootstrap.com/img/new/avatars/6.jpg',
          orders: [
            {
              id: 2,
              customerId: 22,
              name: 'Standing Desk',
              price: 395,
            }
          ]
        },
        {
          id: 33,
          firstname: 'Kate',
          lastname: 'Hunington',
          email: 'kate.hunington@gmail.com',
          icon: 'https://mdbootstrap.com/img/new/avatars/7.jpg',
          orders: [
            {
              id: 3,
              customerId: 33,
              name: 'Live Love Laugh Poster',
              price: 65,
            }
          ]
        },

      ]
      this.api.addCustomer(defaultCustomers[0]).subscribe( resp => {
        this.api.addCustomer(defaultCustomers[1]).subscribe( resp => {
          this.api.addCustomer(defaultCustomers[2]).subscribe( resp => {
            resolve(resp)
          })
        })
      })


    })


  }

  addNewCustomer(firstname: string, lastname: string, email:string, id: number = 0, icon: string = '/assets/icons/user-profile.icon.jpg'): Promise<Customer> {
    return new Promise<Customer>(resolve => {
      let newCustomer: Customer = {
        id: id,
        firstname: firstname,
        lastname: lastname,
        email: email,
        icon: icon,
        orders: [

        ]
      }

      // newCustomer.orders = JSON.stringify(newCustomer.orders)

      this.api.addCustomer(newCustomer).subscribe( resp => {
        console.log('addCustomer ', resp);
        resolve(resp)
      })
    })


  }

  deleteCustomer(id: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.api.deleteCustomer(id).subscribe(r => {
        console.log('deleteCustomer id', id);
        console.log('deleteCustomer ', r);

        resolve(r)
      })
    })
  }


  getCustomers(): Promise<Customer[]> {
    return new Promise<Customer[]>((resolve, reject) => {
      this.api.getCustomers().subscribe( customers => {
        console.log('getCustomers ', customers);

        // parse stringified array of objects
        for (let i = 0; i < customers.length; i++) {
          customers[i].orders = JSON.parse(customers[i].orders)
        }

        resolve(customers)

      })
    })
  }

  getCustomer(id: number): Promise<Customer> {
    return new Promise<Customer>((resolve, reject) => {
      this.api.getCustomer(id).subscribe( customer => {
        console.log('getCustomer  ', customer);
        customer.orders = JSON.parse(customer.orders)

        resolve(customer)

      })
    })
  }

  getNewId(): number {

    this.id = this.id + 1
    return this.id
  }

  /**
   * Update customer by deleting current version and replacing it with updated orders
   * @param customerId
   * @param order
   */
  addOrder(customerId: number, order: Order): Promise<Customer> {
    return new Promise<Customer>( resolve => {
      this.api.getCustomer(customerId).subscribe(customer => {
        this.api.deleteCustomer(customerId).subscribe(r => {

          customer.orders = JSON.parse(customer.orders)
          if(customer.orders == null ) {
            customer.orders = [order]
          } else {
            customer.orders.push(order)

          }
          this.api.addCustomer(customer).subscribe(r => {
            resolve(r)
          })
        })
      })
    })
  }

  removeOrderFromCustomer(customerId: number, orderId: number): Promise<any> {
    return new Promise<boolean>((resolve, reject) => {

      this.api.getCustomer(customerId).subscribe(customer => {
        this.api.deleteCustomer(customerId).subscribe(r => {
          customer.orders = JSON.parse(customer.orders)

          console.log('customer.orders pre', customer.orders);
          for (let i = 0; i < customer.orders.length; i++) {

                  if ((customer.orders[i] as Order).id === orderId) {
                    (customer.orders as Order[]).splice(i, 1)
                    break
                  }
                }
          console.log('customer.orders post', customer.orders);

          this.api.addCustomer(customer).subscribe(r => {
            resolve(r)
          })



        })
      })

    })
  }


  getEmptyCustomer(): Customer {
    return {
      id: 0,
      firstname: '',
      lastname: '',
      email: '',
      icon: '',
      orders: [

      ]
    }
  }

}
