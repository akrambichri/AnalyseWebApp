import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {unsupported} from '@angular/compiler/src/render3/view/util';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  public host = 'http://localhost:8080';
  private jwtToken: string;
  private roles: Array<any> = [];
  constructor(private http: HttpClient) {}

  login(user) {
    return this.http.post(this.host + '/login', user, { observe: 'response'
    });
  }
  register(user) {
    return this.http.post(this.host + '/users', user);
  }
  saveToken(jwtToken) {
    this.jwtToken = jwtToken;
    localStorage.setItem('token', jwtToken);
    this.parseJWT();
  }

  loadToken() {
    this.jwtToken = localStorage.getItem('token');
    this.parseJWT();
    return this.jwtToken;
  }
  logout() {
    localStorage.removeItem('token');
    this.initParams();
  }
  initParams() {
    this.roles  = [];
    this.jwtToken = undefined;
  }
  isAdmin() {
    for (const r of this.roles) {
      if (r === 'ADMIN') { return true; }
    }
    return false;
  }
  isManager() {
    for (const r of this.roles) {
      if (r === 'ANALYSE_MANAGER') { return true; }
    }
    return false;
  }
  isAuthenticated() {
    return this.roles.length !== 0;
  }

  parseJWT() {
    const jwtHelper = new JwtHelperService();
    const jwtDecoded = jwtHelper.decodeToken(this.jwtToken);
    this.roles = jwtDecoded.roles;
  }

  getAllUsers() {
    const header = new HttpHeaders({authorization: 'Bearer ' + this.loadToken()});
    return this.http.get(this.host + '/appUsers' ,{headers: header});
  }

  getRessource(url) {
    const header = new HttpHeaders({authorization: 'Bearer ' + this.loadToken()});
    return this.http.get(url , {headers: header});
  }

  deleteRessource(url) {
    const header = new HttpHeaders({authorization: 'Bearer ' + this.loadToken()});
    return this.http.delete(url, {headers: header});
  }

  postRessource(data, url) {
    const header = new HttpHeaders({authorization: 'Bearer ' + this.loadToken()});
    return this.http.post(url, data, {headers: header});
  }

  putRessource(data, user) {
    const header = new HttpHeaders({authorization: 'Bearer ' + this.loadToken()});
    return this.http.put(user._links.self.href, data, {headers: header});
  }
}
