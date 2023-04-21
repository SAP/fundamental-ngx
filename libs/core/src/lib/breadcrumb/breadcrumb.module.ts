import { NgModule } from '@angular/core';

import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbItemComponent } from './breadcrumb-item.component';
import { LinkModule } from '@fundamental-ngx/core/link';
import { DeprecatedBreadcrumbsCompactDirective } from './deprecated-breadcrumbs-compact.directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    imports: [
        LinkModule,
        ContentDensityModule,
        BreadcrumbComponent,
        BreadcrumbItemComponent,
        DeprecatedBreadcrumbsCompactDirective
    ],
    exports: [
        LinkModule,
        ContentDensityModule,
        BreadcrumbComponent,
        BreadcrumbItemComponent,
        DeprecatedBreadcrumbsCompactDirective
    ]
})
export class BreadcrumbModule {}
