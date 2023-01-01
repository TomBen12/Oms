import { Component } from '@angular/core';
import {Customer} from "../../types/customer.type.ts";
import {CustomersService} from "../../services/customers.service";
import {MdbModalService} from "mdb-angular-ui-kit/modal";
import {CreateCustomerComponent} from "../../components/create-customer/create-customer.component";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {

  customers: Customer[]

  constructor(public customersService: CustomersService,
              private modalService: MdbModalService) {
    // this.customersService.setDefaultCustomers()
  }

  ngOnInit() {
    this.refresh()
  }

  deleteCustomer(id: number): void {
    this.customersService.deleteCustomer(id).then(r => {
      this.refresh()
    })
  }

  refresh() {
    this.customersService.getCustomers().then((customers) => {
      this.customers = customers
    })
  }

  openCreateCustomerModal() {
    let modalResp = this.modalService.open(CreateCustomerComponent)

    modalResp.onClose.subscribe((message: any) => {
      console.log('modalResp', message);

      this.refresh()
    })
  }


}
