import {Order} from "../../../types/order.type.ts";
import {Observable} from "rxjs";
import {User} from "../../../types/user.type.ts";
import {Customer} from "../../../types/customer.type.ts";

export abstract class ApiLib {

  abstract addOrder(order: Order): Observable<any>
  abstract getOrders(): Observable<any>
  abstract getOrder(id: number): Observable<any>
  abstract deleteOrder(id: number):  Observable<any>

  abstract addUser(user: User):  Observable<any>
  abstract getUsers():  Observable<any>
  abstract getUser(id: number):  Observable<any>
  abstract deleteUser(id: number):  Observable<any>

  abstract addCustomer(customer: Customer):  Observable<any>
  abstract getCustomers():Observable<any>
  abstract getCustomer(id: number):  Observable<any>
  abstract deleteCustomer(id: number):  Observable<any>
}
