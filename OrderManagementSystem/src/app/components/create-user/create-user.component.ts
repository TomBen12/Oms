import { Component } from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {User} from "../../types/user.type.ts";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  newUser: User = this.usersService.getEmptyUser()
  showError = false
  missingFields = false
  confirmPassword: string = ''
  constructor(public modalRef: MdbModalRef<CreateUserComponent>,
              private usersService: UsersService) {}

  save() {
    if(this.newUser.username === '' || this.newUser.password === '' || this.confirmPassword === '') {
      this.missingFields = true
      return
    }

    if(this.newUser.password === this.confirmPassword) {
      this.showError = false

      this.usersService.createNewUser(this.newUser.username, this.newUser.password, this.newUser.isAdmin).then(newUser => {
        this.modalRef.close(newUser)
      })

    } else {
      this.showError = true
    }

  }

  fieldsValid() {

  }
  cancel() {
    this.modalRef.close()
  }
}
