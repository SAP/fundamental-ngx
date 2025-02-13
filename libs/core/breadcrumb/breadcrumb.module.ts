import { NgModule } from '@angular/core';

import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { BreadcrumbItemComponent } from './breadcrumb-item.component';
import { BreadcrumbComponent } from './breadcrumb.component';

const components = [BreadcrumbComponent, BreadcrumbItemComponent, LinkComponent, ContentDensityModule];

@NgModule({
    imports: [...components],
    exports: [...components]
})
export class BreadcrumbModule {}
