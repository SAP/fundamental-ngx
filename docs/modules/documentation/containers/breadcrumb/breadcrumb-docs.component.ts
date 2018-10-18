import { Component } from '@angular/core';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb-docs.component.html'
})
export class BreadcrumbDocsComponent {
    breadcrumbHtml1 = `<fd-breadcrumb>
  <fd-breadcrumb-item>
    <a fd-breadcrumb-link [routerLink]="'#'">Breadcrumb Level 1</a>
  </fd-breadcrumb-item>
  <fd-breadcrumb-item>
    <a fd-breadcrumb-link [routerLink]="'#'" [queryParams]="'#'">Breadcrumb Level 2</a>
  </fd-breadcrumb-item>
  <fd-breadcrumb-item>
    <span fd-breadcrumb-link>Breadcrumb Level 3</span>
  </fd-breadcrumb-item>
</fd-breadcrumb>`;

    breadcrumbHtml2 = `<fd-breadcrumb>
  <fd-breadcrumb-item>
    <a fd-breadcrumb-link [attr.href]="'#'">Breadcrumb Level 1</a>
  </fd-breadcrumb-item>
  <fd-breadcrumb-item>
    <a fd-breadcrumb-link [attr.href]="'#'">Breadcrumb Level 2</a>
  </fd-breadcrumb-item>
  <fd-breadcrumb-item>
    <span fd-breadcrumb-link>Breadcrumb Level 3</span>
  </fd-breadcrumb-item>
</fd-breadcrumb>`;

    constructor() {}
}
