import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbItemComponent } from './breadcrumb-item.component';
import { IconModule } from '@fundamental-ngx/core/icon';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { LinkModule } from '@fundamental-ngx/core/link';
import { BreadcrumbHiddenItemComponent } from './breadcrumb-hidden-item/breadcrumb-hidden-item.component';
import { PortalModule } from '@angular/cdk/portal';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { DeprecatedBreadcrumbsCompactDirective } from './deprecated-breadcrumbs-compact.directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    imports: [
        CommonModule,
        IconModule,
        PopoverModule,
        MenuModule,
        LinkModule,
        PortalModule,
        PipeModule,
        ContentDensityModule
    ],
    exports: [
        BreadcrumbComponent,
        BreadcrumbItemComponent,
        LinkModule,
        DeprecatedBreadcrumbsCompactDirective,
        ContentDensityModule
    ],
    declarations: [
        BreadcrumbComponent,
        BreadcrumbItemComponent,
        BreadcrumbHiddenItemComponent,
        DeprecatedBreadcrumbsCompactDirective
    ]
})
export class BreadcrumbModule {}
