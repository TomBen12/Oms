import { Component } from '@angular/core';
import {Customer} from "../../types/customer.type.ts";
import {Order} from "../../types/order.type.ts";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CustomersService} from "../../services/customers.service";
import {OrdersService} from "../../services/orders.service";

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent {

  // customers: Customer[]
  newCustomer: Customer =  this.customersService.getEmptyCustomer()

  showError = false

  constructor(public modalRef: MdbModalRef<CreateCustomerComponent>,
              private customersService: CustomersService,
              private ordersService: OrdersService) {
    // this.customers = this.customersService.getCustomers()
  }

  // missingFields() {
  //   if(this.newOrder.name )
  // }

  save() {
    if(this.newCustomer.email === '' || this.newCustomer.firstname === '' || this.newCustomer.lastname === '') {
      this.showError = true

    }
    else {
    this.customersService.addNewCustomer(this.newCustomer.firstname, this.newCustomer.lastname, this.newCustomer.email).then(customer => {
      this.modalRef.close(customer)
    })

    }

  }

  cancel() {
    this.modalRef.close()
  }
}
