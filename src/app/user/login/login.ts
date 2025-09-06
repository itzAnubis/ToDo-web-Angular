import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
    form: any;
    isSubmitted: boolean = false;

  constructor(public formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {

    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required,]]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      this.service.signin(this.form.value)
        .subscribe({
          next: (res: any) => {
            localStorage.setItem('token',res.token);
            this.router.navigateByUrl('/dashboard');
          },
          error: err => {
            if(err.status===400)
              this.toastr.error('Invalid email or password', 'Login Failed');
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
