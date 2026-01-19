import { Component } from '@angular/core';
import { Breadcrumbs } from '@fundamental-ngx/ui5-webcomponents/breadcrumbs';
import { BreadcrumbsItem } from '@fundamental-ngx/ui5-webcomponents/breadcrumbs-item';

@Component({
    selector: 'ui5-breadcrumbs-separators-sample',
    templateUrl: './separators.html',
    standalone: true,
    imports: [Breadcrumbs, BreadcrumbsItem]
})
export class BreadcrumbsSeparatorsSample {}
