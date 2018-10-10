import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbDirective } from './breadcrumb.directive';
import { BreadcrumbItemDirective } from './breadcrumb-item.directive';
import { BreadcrumbLinkDirective } from './breadcrumb-link.directive';

@NgModule({
    imports: [CommonModule, RouterModule],
    exports: [BreadcrumbDirective, BreadcrumbItemDirective, BreadcrumbLinkDirective],
    declarations: [BreadcrumbDirective, BreadcrumbItemDirective, BreadcrumbLinkDirective]
})
export class BreadcrumbModule {}
