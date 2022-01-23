import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[] = []

  constructor(private usersService: UsersService) {
    this.usersService.getUsers().subscribe(res => {
      this.users = res
    })
   }

  ngOnInit(): void {
  }
  banUser(user: User){
    this.usersService.banUser(user).then(res => {
      console.log('user banned')
    })
  }
  unbanUser(user: User){
    this.usersService.unbanUser(user).then(res => {
      console.log('user unbanned')
    })
  }
  changeRole(user: User, role: string){
    this.usersService.changeRole(user,role).then(res => {
      console.log('role changed')
    })
  }

}
