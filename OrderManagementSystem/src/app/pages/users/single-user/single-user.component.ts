import { Component } from '@angular/core';
import {UsersService} from "../../../services/users.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../types/user.type.ts";

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent {

  user: User
  constructor(private usersService: UsersService,
              private activeRoute: ActivatedRoute) {
    const id = this.activeRoute.snapshot.paramMap.get('id')
    if(id !== null) {
      this.usersService.getUser(+id).then(user => {
        console.log('getUser ', user);
        this.user = user
      })


    }  }
}
