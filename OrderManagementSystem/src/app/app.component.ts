import {Component, OnInit} from '@angular/core';
import {UsersService} from "./services/users.service";
import {User} from "./types/user.type.ts";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {CustomersService} from "./services/customers.service";
import {OrdersService} from "./services/orders.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'OrderManagementSystem';
  loggedInUser: User | false = false
  userEvent: any

  constructor(public usersService: UsersService,
              private customersService: CustomersService,
              private ordersService: OrdersService,
              public router: Router) {
    this.loggedInUser = this.usersService.getLoggedInUser()
    this.customersService.addDefaultCustomers()
    this.ordersService.addDefaultOrders()


  }

  async ngOnInit() {
    this.usersService.getloggedInUserEvent().subscribe((res: User | any) => {
      console.log('res event ', res);
      this.loggedInUser = res
    })

    // redirect app on reload
    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe(event => {
        if (
          event.id === 1 &&
          event.url === event.urlAfterRedirects
        ) {
          // Your code here for when the page is refreshd
          this.router.navigateByUrl('/login')
          this.usersService.setLoggedInUser(false)
        }
      })
  }

}
