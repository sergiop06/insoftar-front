import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  form: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('resetUserForm') myNgForm: any;
  firstName = new FormControl('', [Validators.required]);
  lastName= new FormControl('', Validators.required);
  cedula= new FormControl('', [Validators.required]);
  email= new FormControl('', [Validators.required,Validators.email]);
  phoneNumber= new FormControl('', [Validators.required]);

  currentUser: User = {
    id: undefined,
    firstName:'',
    lastName: '',
    cedula: undefined,
    email: '',
    phoneNumber: undefined
  };
  message = '';
  submitted = false;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder) {
      this.form = new FormGroup({});
    }

  ngOnInit(): void {
    this.message = '';
    this.getUser(this.route.snapshot.params.id);
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', Validators.required),
      cedula: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.email]),
      phoneNumber: new FormControl('', [Validators.required]),
    });
  }

  get f(){
    return this.form.controls;
  }

  getUser(id: number): void {
    this.userService.get(id)
      .subscribe(
        data => {
          this.currentUser = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateUser(): void {
    this.userService.update(this.currentUser.id, this.currentUser)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message;
        },
        error => {
          console.log(error);
        });
  }

  deleteUser(): void {
    this.userService.delete(this.currentUser.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/users']);
        },
        error => {
          console.log(error);
        });
  }

  submit(){
    console.log("submit"+this.form.value);
    this.userService.update(this.currentUser.id, this.form.value).subscribe(res => {
         console.log('Post updated successfully!');
         this.gotoMain();
    })
  }

  getErrorMessage() {
    if (this.form.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }
    return this.form.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  gotoMain(){
    this.router.navigate(['/']);
  }

}
