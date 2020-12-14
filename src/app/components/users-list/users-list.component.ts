import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[];
  currentUser?: User;
  currentIndex = -1;
  firstName = '';

  columnsToDisplay : string[] = ['id', 'firstName', 'lastName', 'cedula', 'email', 'phoneNumber', 'action'];

  constructor(private userService : UsersService,private router: Router ) {
    this.users=[];
  }

  ngOnInit(): void {
    this.retrieveUsers();

  }
  retrieveUsers() {
    this.userService.getAll().subscribe(
      data => {
        this.users = data;
        console.log(data);
      },
      error => {
        console.log("couldnt rtreive users")
        console.log(error);
      }
    )
  }

  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = undefined;
    this.currentIndex = -1;
  }

  setActiveUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }

  removeAllUsers(): void {
    this.userService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  deleteUser(id: number){
    this.userService.delete(id)
      .subscribe(
        response => {
          console.log("user deleted with id "+ response);
            this.refreshList();
        },
        error => {
          console.log(error);
        });

  }

  updateUser(id: number){
    this.router.navigate(['/users/',id]);
  }

  goToCreateNewUser(){
    this.router.navigate(['/add']);
  }
}
