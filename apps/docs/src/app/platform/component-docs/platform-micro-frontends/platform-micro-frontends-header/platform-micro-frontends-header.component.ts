import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-micro-frontends-header',
    templateUrl: './platform-micro-frontends-header.component.html'
})

export class PlatformMicroFrontendsHeaderComponent implements OnInit {

    constructor(private router?: Router) { }

    ngOnInit() {
        this.router.navigateByUrl('/platform/microfrontends/example');
    }
 }
