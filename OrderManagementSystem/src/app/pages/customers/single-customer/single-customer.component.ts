import { Component } from '@angular/core';
import {Customer} from "../../../types/customer.type.ts";
import {ActivatedRoute} from "@angular/router";
import {OrdersService} from "../../../services/orders.service";
import {CustomersService} from "../../../services/customers.service";
import {Order} from "../../../types/order.type.ts";
import {User} from "../../../types/user.type.ts";

@Component({
  selector: 'app-single-customer',
  templateUrl: './single-customer.component.html',
  styleUrls: ['./single-customer.component.scss']
})
export class SingleCustomerComponent {

  customer: Customer = this.customersService.getEmptyCustomer()
  customerOrders: Order[] = []

  constructor(private activeRoute: ActivatedRoute,
              private customersService: CustomersService,
              private ordersService: OrdersService) {

    const id = this.activeRoute.snapshot.paramMap.get('id')
    if(id !== null) {
      this.customersService.getCustomer(+id).then(customer => {
        this.customer = customer

        if(typeof(customer.orders) !== 'string')
          this.customerOrders = customer.orders

      })



    }

  }
}
