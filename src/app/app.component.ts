import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthentificationService} from './authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AnalysesWebApp';

  constructor(private authService: AuthentificationService,
              private router: Router) {
  }
  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isManager() {
    return this.authService.isManager();
  }
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    this.authService.loadToken();
  }

}
