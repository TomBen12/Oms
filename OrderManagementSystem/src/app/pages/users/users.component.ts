import {Component, OnInit} from '@angular/core';
import {User} from "../../types/user.type.ts";
import {CreateCustomerComponent} from "../../components/create-customer/create-customer.component";
import {MdbModalService} from "mdb-angular-ui-kit/modal";
import {UsersService} from "../../services/users.service";
import {CreateUserComponent} from "../../components/create-user/create-user.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{

  users: User[]

  constructor(private modalService: MdbModalService,
              public usersService: UsersService) {
  }

  ngOnInit() {
    this.refresh()
  }
  refresh() {
    this.usersService.getUsers().then((users) => {
      this.users = users
    })
  }
  openCreateUserModal() {
    let modalResp = this.modalService.open(CreateUserComponent)

    modalResp.onClose.subscribe((message: any) => {
      console.log('modalResp', message);
      this.refresh()
    })
  }


  deleteUser(id: number) {

    if(this.usersService.getLoggedInUser().id !== id) {   // logged in user cant delete himself
      this.usersService.deleteUser(id).then((r) => {
        this.refresh()
      })
    } else {
     alert('Cant delete logged in user')
    }

  }





}
