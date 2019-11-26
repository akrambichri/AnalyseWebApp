import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../authentification.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  constructor(private authService: AuthentificationService , ) { }

  users;
  mode = 'default';

  currentUser;

  ngOnInit() {
    this.onGetAllUsers();
  }

  onGetAllUsers() {
    this.authService.getAllUsers()
      .subscribe(data => {
        this.users = data;
      }, err => {
        console.log(err);
      });
  }

  onDeleteUser(user) {
    if (!confirm('Etes vous sur ?')) { return; }
    this.authService.deleteRessource(user._links.self.href)
      .subscribe(data => {
        this.onGetAllUsers();
      }, err => {
        console.log(err);
      });
  }

  onNewUser() {
    this.mode = 'new';
  }

  onSaveUser(clt) {
    const url = this.authService.host + '/appUsers';
    this.authService.postRessource(clt , url)
      .subscribe(data => {
        this.onGetAllUsers();
        this.mode = 'default';
      }, err => {
        console.log(err);
      });
  }

  onUpdateUser(newUser) {
    this.authService.putRessource(newUser, this.currentUser)
      .subscribe(data => {
        this.onGetAllUsers();
        this.mode = 'default';
      }, err => {
        console.log(err);
      });
  }
  onEditUser(newUser) {
    this.authService.getRessource(newUser._links.self.href)
      .subscribe(data => {
        this.currentUser = data;
        this.mode = 'edit';
      }, err => {
        console.log(err);
      });
  }
}
