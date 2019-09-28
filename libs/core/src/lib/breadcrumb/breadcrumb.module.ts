import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbItemDirective } from './breadcrumb-item.directive';
import { BreadcrumbLinkDirective } from './breadcrumb-link.directive';

@NgModule({
    imports: [CommonModule],
    exports: [BreadcrumbComponent, BreadcrumbItemDirective, BreadcrumbLinkDirective],
    declarations: [BreadcrumbComponent, BreadcrumbItemDirective, BreadcrumbLinkDirective]
})
export class BreadcrumbModule {}
