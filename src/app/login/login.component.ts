import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthentificationService} from '../authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private mode = 0;

  constructor(private authService: AuthentificationService,
              private router: Router) { }

  ngOnInit() {
  const token = this.authService.loadToken();
  if (token) {
    // this.router.navigateByUrl('/tasks');
  }

  }
  onLogin(formData) {
    this.authService.login(formData)
      .subscribe(resp => {
          const jwtToken = resp.headers.get('Authorization');
          this.authService.saveToken(jwtToken);
          // this.router.navigateByUrl('/tasks');
        },
        err => {
          this.mode = 1;
        });
  }
  onRegister() {
    this.router.navigateByUrl('/register');
  }



  }


