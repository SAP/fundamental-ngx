import { Component, Directive, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: 'fd-breadcrumb',
  host: {
    class: 'fd-breadcrumb'
  }
})
export class Breadcrumb {}

@Component({
  selector: 'fd-breadcrumb-item',
  host: {
    class: 'fd-breadcrumb__item'
  },
  template: `
    <a *ngIf="url;else noUrltemplate" class="fd-breadcrumb__link" [routerLink]="['url']"> {{text}} </a>
    <ng-template #noUrltemplate> {{text}} </ng-template>
  `
})
export class BreadcrumbItem {
  constructor(private router: Router) {}

  @Input() url: string;

  @Input() text: string;
}
