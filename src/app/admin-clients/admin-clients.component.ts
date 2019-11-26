import { Component, OnInit } from '@angular/core';
import {AnalyseService} from '../analyse.service';
import {AuthentificationService} from '../authentification.service';

@Component({
  selector: 'app-admin-clients',
  templateUrl: './admin-clients.component.html',
  styleUrls: ['./admin-clients.component.css']
})
export class AdminClientsComponent implements OnInit {
  constructor(private AnalysService: AnalyseService , private authService: AuthentificationService , ) { }

  clients;
  mode = 'default';

  currentClient;

  ngOnInit() {
    this.onGetAllClients();
  }

  onGetAllClients() {
    this.AnalysService.getAll('clients')
      .subscribe(data => {
        this.clients = data;
      }, err => {
        console.log(err);
      });
  }

  onDeleteClt(clt) {
    if (!confirm('Etes vous sur ?')) { return; }
    this.AnalysService.deleteRessource(clt._links.self.href)
      .subscribe(data => {
        this.onGetAllClients();
    }, err => {
      console.log(err);
    });
  }

  onNewClt() {
    this.mode = 'new';
  }

  onSaveClt(clt) {
    const url = this.AnalysService.host + '/clients';
    this.AnalysService.postRessource(clt , url)
      .subscribe(data => {
        this.onGetAllClients();
        this.mode = 'default';
      }, err => {
        console.log(err);
      });
  }

  onUpdateClt(newClt) {
    this.AnalysService.putRessource(newClt, this.currentClient)
      .subscribe(data => {
        this.onGetAllClients();
        this.mode = 'default';
      }, err => {
        console.log(err);
      });
  }
  onEditClt(clt) {
      this.AnalysService.getRessource(clt._links.self.href)
        .subscribe(data => {
          this.currentClient = data;
          this.mode = 'edit';
        }, err => {
          console.log(err);
        });
  }
}
