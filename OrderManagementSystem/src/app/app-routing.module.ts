import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {OrdersComponent} from "./pages/orders/orders.component";
import {CustomersComponent} from "./pages/customers/customers.component";
import {UsersComponent} from "./pages/users/users.component";
import {LoginComponent} from "./pages/login/login.component";
import {SingleOrderComponent} from "./pages/orders/single-order/single-order.component";
import {SingleCustomerComponent} from "./pages/customers/single-customer/single-customer.component";
import {SingleUserComponent} from "./pages/users/single-user/single-user.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'orders/:id',
    component: SingleOrderComponent
  },
  {
    path: 'customers',
    component: CustomersComponent
  },
  {
    path: 'customers/:id',
    component: SingleCustomerComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'users/:id',
    component: SingleUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
