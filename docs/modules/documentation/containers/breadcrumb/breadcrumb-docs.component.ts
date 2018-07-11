import { Component } from '@angular/core';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb-docs.component.html'
})
export class BreadcrumbDocsComponent {
    breadcrumbHtml =
        '<fd-breadcrumb>\n' +
        '  <fd-breadcrumb-item [url]="\'#\'">Link Text</fd-breadcrumb-item>\n' +
        '  <fd-breadcrumb-item [routerLink]="\'#\'" [queryParams]="\'#\'">Link Text</fd-breadcrumb-item>\n' +
        '  <fd-breadcrumb-item>Link Text</fd-breadcrumb-item>\n' +
        '</fd-breadcrumb>\n';

    constructor() {}
}
