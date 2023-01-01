import {Component, OnInit} from '@angular/core';
import {Order} from "../../../types/order.type.ts";
import {ActivatedRoute} from "@angular/router";
import {OrdersService} from "../../../services/orders.service";
import {Customer} from "../../../types/customer.type.ts";
import {CustomersService} from "../../../services/customers.service";

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.scss']
})
export class SingleOrderComponent implements OnInit{

  order:Order = this.ordersService.getEmptyOrder()
  customerRelatedToOrder: Customer = this.customersService.getEmptyCustomer()

  constructor(private activeRoute: ActivatedRoute,
              private ordersService: OrdersService,
              private customersService: CustomersService) {

  }

  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('id')

    if(id !== null) {
      this.ordersService.getOrder(+id).then( (order) => {
        this.order = order

        this.customersService.getCustomer(this.order.customerId).then( customer => {
          this.customerRelatedToOrder = customer
        })
      })

    }
  }
}
