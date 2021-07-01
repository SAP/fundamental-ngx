import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbItemDirective } from './breadcrumb-item.directive';
import { BreadcrumbLinkDirective } from './breadcrumb-link.directive';
import { IconModule } from '@fundamental-ngx/core/icon';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { MenuModule } from '@fundamental-ngx/core/menu';

@NgModule({
    imports: [CommonModule, IconModule, PopoverModule, MenuModule, RouterModule],
    exports: [BreadcrumbComponent, BreadcrumbItemDirective, BreadcrumbLinkDirective],
    declarations: [BreadcrumbComponent, BreadcrumbItemDirective, BreadcrumbLinkDirective]
})
export class BreadcrumbModule {}
