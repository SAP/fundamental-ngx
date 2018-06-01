import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pluck';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  url$: Observable<string>;

  constructor(private router: Router) {}

  ngOnInit() {
    this.url$ = this.router.events.filter(event => event instanceof NavigationEnd).pluck('url');
  }
}
