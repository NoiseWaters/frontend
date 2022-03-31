import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user-service.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users = [] as any;

  constructor(private userService : UserService) { }

  ngOnInit(): void {

    this.userService.findAll().subscribe(data => {
      this.users = data
    });
  }

}
