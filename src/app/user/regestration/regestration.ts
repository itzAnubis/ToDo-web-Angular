import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth-service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-regestration',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './regestration.html',
  styleUrl: './regestration.css',
  standalone: true
})
export class Regestration {
  form: any;

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value)
      confirmPassword?.setErrors({ passwordMismatch: true })
    else
      confirmPassword?.setErrors(null);
    return null;
  }

  constructor(public formBuilder: FormBuilder,
    private service: AuthService,
    private toastr: ToastrService) {

    this.form = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/)
      ]],
      confirmPassword: ['']
    }, { validators: this.passwordMatchValidator });
  }

  isSubmitted: boolean = false;


  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.service.createUser(this.form.value)
        .subscribe({
          next: (res: any) => {
            if (res.succeeded) {
              this.form.reset();
              this.isSubmitted = false;
              this.toastr.success('User created successfully!', 'Success');
            }

          },
          error: err => {
            if(err.error.errors)
            err.error.errors?.forEach((element: any) => {
              switch (element.code) {
                case 'DuplicateUserName':
                  break;
                case 'DublicateEmail':
                  this.toastr.error('Email is already taken!', 'Error');
                  break;
                default:
                  this.toastr.error('Something went wrong!', 'Error');
                  // console.log('error', element);
                  break;

              }
            })
            else
            this.toastr.error('Something went wrong!', 'Error');


          }
        })
    }
  }

  hasDisplayableError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched)|| Boolean(control?.dirty))
  }
}
