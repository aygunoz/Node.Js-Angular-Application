import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router) {
  }

  onLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    this.auth.login(loginForm.value.email, loginForm.value.password);
    this.router.navigate(['/']);
  }
}
