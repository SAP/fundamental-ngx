import { Component } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent {
  breadcrumbHtml =
    '<fd-breadcrumb>\n' +
    '  <fd-breadcrumb-item [url]="\'#\'" [text]="\'Link Text\'"></fd-breadcrumb-item>\n' +
    '  <fd-breadcrumb-item [url]="\'#\'" [text]="\'Link Text\'"></fd-breadcrumb-item>\n' +
    '  <fd-breadcrumb-item [text]="\'Link Text\'"></fd-breadcrumb-item>\n' +
    '</fd-breadcrumb>\n';

  constructor() {}
}
