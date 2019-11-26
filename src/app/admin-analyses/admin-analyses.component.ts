import { Component, OnInit } from '@angular/core';
import {AnalyseService} from '../analyse.service';
import {AuthentificationService} from '../authentification.service';

@Component({
  selector: 'app-admin-analyses',
  templateUrl: './admin-analyses.component.html',
  styleUrls: ['./admin-analyses.component.css']
})
export class AdminAnalysesComponent implements OnInit {

  constructor(private AnalysService: AnalyseService , private authService: AuthentificationService , ) { }

  analyses;
  mode = 'default';
  currentAnalyse;
  clients;

  ngOnInit() {
    this.onGetAllAnalyses();
  }

  onGetAllAnalyses() {
    this.AnalysService.getAll('analyses')
      .subscribe(data => {
        this.analyses = data;
      }, err => {
        console.log(err);
      });
  }
  onDeleteClt(anlys) {
    if (!confirm('Etes vous sur ?')) { return; }
    this.AnalysService.deleteRessource(anlys._links.self.href)
      .subscribe(data => {
        this.onGetAllAnalyses();
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
        this.onGetAllAnalyses();
        this.mode = 'default';
      }, err => {
        console.log(err);
      });
  }

  onUpdateClt(newClt) {
    this.AnalysService.putRessource(newClt, this.currentAnalyse)
      .subscribe(data => {
        this.onGetAllAnalyses();
        this.mode = 'default';
      }, err => {
        console.log(err);
      });
  }
  onEditClt(anlys) {
    this.AnalysService.getRessource(anlys._links.self.href)
      .subscribe(data => {
        this.currentAnalyse = data;
        this.mode = 'edit';
      }, err => {
        console.log(err);
      });
  }
}
