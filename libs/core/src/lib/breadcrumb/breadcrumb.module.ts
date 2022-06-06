import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbItemDirective } from './breadcrumb-item.directive';
import { IconModule } from '@fundamental-ngx/core/icon';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { LinkModule } from '@fundamental-ngx/core/link';
import { BreadcrumbHiddenItemComponent } from './breadcrumb-hidden-item/breadcrumb-hidden-item.component';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
    imports: [CommonModule, IconModule, PopoverModule, MenuModule, LinkModule, PortalModule],
    exports: [BreadcrumbComponent, BreadcrumbItemDirective, LinkModule],
    declarations: [BreadcrumbComponent, BreadcrumbItemDirective, BreadcrumbHiddenItemComponent]
})
export class BreadcrumbModule {}
