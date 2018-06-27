import { Component } from '@angular/core';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb-docs.component.html'
})
export class BreadcrumbDocsComponent {
    breadcrumbHtml =
        '<fd-breadcrumb>\n' +
        '  <fd-breadcrumb-item [url]="\'#\'" [text]="\'Link Text\'"></fd-breadcrumb-item>\n' +
        '  <fd-breadcrumb-item [url]="\'#\'" [text]="\'Link Text\'"></fd-breadcrumb-item>\n' +
        '  <fd-breadcrumb-item [text]="\'Link Text\'"></fd-breadcrumb-item>\n' +
        '</fd-breadcrumb>\n';

    constructor() {}
}
