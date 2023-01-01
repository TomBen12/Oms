import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MdbCollapseModule} from "mdb-angular-ui-kit/collapse";
import { OrdersComponent } from './pages/orders/orders.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import {MdbFormsModule} from "mdb-angular-ui-kit/forms";
import {MdbModalService} from "mdb-angular-ui-kit/modal";
import {FormsModule} from "@angular/forms";
import { SingleOrderComponent } from './pages/orders/single-order/single-order.component';
import {SingleCustomerComponent} from "./pages/customers/single-customer/single-customer.component";
import {RouterModule} from "@angular/router";
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import {CommonModule} from "@angular/common";
import { SingleUserComponent } from './pages/users/single-user/single-user.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import {ApiService} from "./services/api/api.service";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    CustomersComponent,
    UsersComponent,
    LoginComponent,
    CreateOrderComponent,
    SingleOrderComponent,
    SingleCustomerComponent,
    CreateCustomerComponent,
    SingleUserComponent,
    CreateUserComponent
  ],
  imports: [
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    MdbCollapseModule,
    MdbFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [MdbModalService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
