import { Component, OnInit } from '@angular/core';
import {AnalyseService} from '../analyse.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './analyses.component.html',
  styleUrls: ['./analyses.component.css']
})
export class AnalysesComponent implements OnInit {
  analyses;
  constructor(private analysService: AnalyseService, private router: Router , private route: ActivatedRoute) {
    // tslint:disable-next-line:no-shadowed-variable
    router.events.subscribe(event => {
      if (event instanceof  NavigationEnd) {
        const url = atob(route.snapshot.params.urlAnls);
        this.getAnalyses(url);
      }
    });

  }
  ngOnInit() {
  }

  getAnalyses(urlAnls) {
  this.analysService.getRessource(urlAnls)
    .subscribe(data => {
      console.log(data);
      this.analyses = data;
    }, err => {
    console.log(err);
  });
  }
}
