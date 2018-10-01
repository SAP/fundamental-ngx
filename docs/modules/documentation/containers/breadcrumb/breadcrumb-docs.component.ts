import { Component } from '@angular/core';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb-docs.component.html'
})
export class BreadcrumbDocsComponent {
    breadcrumbHtml1 = `<fd-breadcrumb>
    <fd-breadcrumb-item [routerLink]="\'#\'">Link Text</fd-breadcrumb-item>
    <fd-breadcrumb-item [routerLink]="\'#\'" [queryParams]="\'#\'">Link Text</fd-breadcrumb-item>
    <fd-breadcrumb-item>Link Text</fd-breadcrumb-item>
</fd-breadcrumb>`;

    breadcrumbHtml2 = `<fd-breadcrumb>
    <fd-breadcrumb-item [url]="'/docs/breadcrumb'">Link Text</fd-breadcrumb-item>
    <fd-breadcrumb-item [url]="'/docs/inputGroup'" >Link Text</fd-breadcrumb-item>
    <fd-breadcrumb-item>Link Text</fd-breadcrumb-item>
</fd-breadcrumb>`;

    constructor() {}
}
