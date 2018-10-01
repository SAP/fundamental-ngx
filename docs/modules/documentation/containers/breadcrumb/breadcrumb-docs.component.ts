import { Component } from '@angular/core';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb-docs.component.html'
})
export class BreadcrumbDocsComponent {
    breadcrumbHtml1 = `<fd-breadcrumb>
    <fd-breadcrumb-item [routerLink]="'#'">Breadcrumb Level 1</fd-breadcrumb-item>
    <fd-breadcrumb-item [routerLink]="'#'" [queryParams]="'#'">Breadcrumb Level 2</fd-breadcrumb-item>
    <fd-breadcrumb-item>Breadcrumb Level 3</fd-breadcrumb-item>
</fd-breadcrumb>`;

    breadcrumbHtml2 = `<fd-breadcrumb>
    <fd-breadcrumb-item [url]="'/docs/breadcrumb'">Breadcrumb Level 1</fd-breadcrumb-item>
    <fd-breadcrumb-item [url]="'/docs/inputGroup'">Breadcrumb Level 2</fd-breadcrumb-item>
    <fd-breadcrumb-item>Breadcrumb Level 3</fd-breadcrumb-item>
</fd-breadcrumb>`;

    constructor() {}
}
