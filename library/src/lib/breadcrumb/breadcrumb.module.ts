import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbDirective } from './breadcrumb.directive';
import { BreadcrumbItemDirective } from './breadcrumb-item.directive';
import { BreadcrumbLinkDirective } from './breadcrumb-link.directive';

@NgModule({
    imports: [CommonModule],
    exports: [BreadcrumbDirective, BreadcrumbItemDirective, BreadcrumbLinkDirective],
    declarations: [BreadcrumbDirective, BreadcrumbItemDirective, BreadcrumbLinkDirective]
})
export class BreadcrumbModule {}
