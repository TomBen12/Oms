import {Component, OnInit} from '@angular/core';
import {Order} from "../../types/order.type.ts";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {CreateOrderComponent} from "../../components/create-order/create-order.component";
import {OrdersService} from "../../services/orders.service";
import {CustomersService} from "../../services/customers.service";
import {Customer} from "../../types/customer.type.ts";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{

  orders: Order[]
  customers: Customer[]
  customerRelatedToOrder: Customer

  constructor(private modalService: MdbModalService,
              public ordersService: OrdersService,
              public customersService: CustomersService) {
  }


  ngOnInit() {

    this.refresh()
  }

  async openCreateOrderModal() {
    let modalResp = this.modalService.open(CreateOrderComponent)

    modalResp.onClose.subscribe((message: any) => {
      console.log('modalResp', message);

      this.refresh()

    })
  }

  refresh() {
    console.log('refresh');
    this.ordersService.getOrders().then((orders) => {
      this.orders = orders

      this.customersService.getCustomers().then((customers) => {
        this.customers = customers
      })
    })




  }

  deleteOrder(orderId: number, customerId: number) {
    this.ordersService.deleteOrder(orderId, customerId).then((r) => {
      console.log('delete order resp ', r);
      this.refresh()
    })
  }



  getCustomerName(customerId: number): string {

    console.log('getCustomerName ', customerId);
    // let customer = await this.customersService.getCustomer(customerId)

    if(this.customers !== undefined) {
      for(let customer of this.customers) {
        if(customer.id === customerId)
          return customer.firstname + ' ' + customer.lastname
      }
    }


    return ''
  }




}
