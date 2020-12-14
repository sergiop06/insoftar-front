import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('resetUserForm') myNgForm: any;
  form: FormGroup;
  firstName = new FormControl('', [Validators.required]);
  lastName= new FormControl('', Validators.required);
  cedula= new FormControl('', [Validators.required]);
  email= new FormControl('', [Validators.required,Validators.email]);
  phoneNumber= new FormControl('', [Validators.required]);

  user: User = {
    firstName:'',
    lastName: '',
    cedula: undefined,
    email: '',
    phoneNumber: undefined
  }
  submitted = false;

  constructor(
    private userService: UsersService,
    private router: Router,public fb: FormBuilder,) {

      this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.submitInitial();
  }
  get f(){
    return this.form.controls;
  }

  submitInitial(){
    this.form = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', Validators.required),
      cedula: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email,Validators.minLength(6),
        Validators.maxLength(64)]),
      phoneNumber: new FormControl('', [Validators.required]),
    });
  }

  saveUser(): void {
    if (this.form.valid) {
      this.userService.create(this.form.value)
      .subscribe(
        response => {
          console.log("user created with id "+ response);
            this.submitted = true;
            this.gotoMain();
        },
        error => {
          console.log(error);
        });
    }

    this.form.controls

  }

  public handleError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  gotoMain(){
    this.router.navigate(['/']);
  }
}
