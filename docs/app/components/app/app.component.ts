import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, pluck } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    url$: Observable<string>;

    goToGithub() {
        window.location.href = 'https://github.com/SAP/fundamental-ngx';
    }

    constructor(private router: Router) {}

    ngOnInit() {
        this.url$ = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).pipe(pluck('url'));
    }
}
