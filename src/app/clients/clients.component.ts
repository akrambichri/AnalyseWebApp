import { Component, OnInit } from '@angular/core';
import {AnalyseService} from '../analyse.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  constructor(private analyseService: AnalyseService, private router: Router) { }
  clients;
  currentClient;
  ngOnInit() {
    this.analyseService.getAll('clients')
      .subscribe(data => {
        this.clients = data;
      }, err => {
        console.log(err);
      });
  }
  onGetAnalyses(clt) {
    this.currentClient = clt;
    const url = clt._links.analyses.href;
    this.router.navigateByUrl('/analyses/' + btoa(url));
  }
}
