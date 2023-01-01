import { Component } from '@angular/core';
import {User} from "../../types/user.type.ts";
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";
import {ApiService} from "../../services/api/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginInfo: User
  register = false
  confirmPassword = ''
  users: User[]

  showError = false
  missingFields = false

  constructor(private usersService: UsersService,
              private router: Router) {
    this.loginInfo = this.usersService.getEmptyUser()

    this.usersService.getUsers().then((r) => {
      this.users = r
    })

  }

  /**
   * Cycles through users array, if login info matched, set userLoggedIn in users service and route to app,
   * otherwise return false
   */
  doLogin(): boolean {


    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === this.loginInfo.username && this.users[i].password === this.loginInfo.password) {
        this.usersService.setLoggedInUser(this.users[i])
        this.router.navigateByUrl('/customers')
        return true
      }
    }

    return false
  }


  doRegistration() {
    if(this.loginInfo.username === '' || this.loginInfo.password === '' || this.confirmPassword === '') {
      this.missingFields = true
      return
    }

    if (this.loginInfo.password === this.confirmPassword) {
      this.usersService.createNewUser(this.loginInfo.username, this.loginInfo.password, true).then((newUser => {
        this.usersService.setLoggedInUser(newUser)
        this.router.navigateByUrl('/customers')
      }))


    } else {
      this.showError = true
    }
  }
}
