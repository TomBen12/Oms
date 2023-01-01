import {Customer} from "./customer.type.ts";

export interface Order {
  id: number
  customerId: number
  name: string
  price: number
}
