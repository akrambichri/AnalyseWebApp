import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthentificationService} from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyseService {
  public host = 'http://localhost:8087';

  constructor(private http: HttpClient, private authService: AuthentificationService) { }

  getAll(ressource) {
    return this.http.get(this.host + '/' + ressource);
  }

  getRessource(url) {
      return this.http.get(url);
  }

  deleteRessource(url) {
    const header = new HttpHeaders({authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.delete(url, {headers: header});
  }

  postRessource(data, url) {
    const header = new HttpHeaders({authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.post(url, data, {headers: header});
  }

  putRessource(data, cat) {
    const header = new HttpHeaders({authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.put(cat._links.self.href, data, {headers: header});
  }
}
