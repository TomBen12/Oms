import {User} from "./user.type.ts";
import {Order} from "./order.type.ts";

export interface Customer {
  id: number
  firstname: string
  lastname: string
  icon?: string
  email: string
  orders: Order[] | string
}
