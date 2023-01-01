import { Component } from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {Customer} from "../../types/customer.type.ts";
import {CustomersService} from "../../services/customers.service";
import {OrdersService} from "../../services/orders.service";
import {Order} from "../../types/order.type.ts";

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent {

  customerId: number  = -1

  customers: Customer[]
  newOrder: Order =  this.ordersService.getEmptyOrder()

  missingFields = false

  constructor(public modalRef: MdbModalRef<CreateOrderComponent>,
              private customersService: CustomersService,
              private ordersService: OrdersService) {
    this.customersService.getCustomers().then( customers => {
      this.customers = customers
    })
  }


  save() {
    console.log('this.customerId ', this.customerId);
    if(this.newOrder.name === '' || this.newOrder.price === 0 || this.customerId === -1) {
      this.missingFields = true
    }
    else {
      this.ordersService.createNewOrder(this.customerId, this.newOrder.name, +this.newOrder.price).then(newOrder => {
        this.modalRef.close(newOrder)
      }).catch(e => {
        console.log('Failed to createNewOrder ', e)
        this.modalRef.close()
      })

    }


  }

  cancel() {
    this.modalRef.close()
  }
}
