import { Component, Directive, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
    selector: 'fd-breadcrumb',
    host: {
        class: 'fd-breadcrumb'
    }
})
export class BreadcrumbDirective {}

@Component({
    selector: 'fd-breadcrumb-item',
    host: {
        class: 'fd-breadcrumb__item'
    },
    templateUrl: './breadcrumb-item.component.html'
})
export class BreadcrumbItemComponent {
    constructor(private router: Router) {}

    @Input() url: string;

    @Input() text: string;
}
