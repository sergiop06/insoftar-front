import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user: User = {
    firstName:'',
    lastName: '',
    cedula: undefined,
    email: '',
    phoneNumber: undefined
  }
  submitted = false;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

  saveUser(): void {
    const data = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      cedula: this.user.cedula,
      email: this.user.email,
      phoneNumber: this.user.phoneNumber
    };

    this.userService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
      firstName:'',
      lastName: '',
      cedula: undefined,
      email: '',
      phoneNumber: undefined
    };
  }


}
