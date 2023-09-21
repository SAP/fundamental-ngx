import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { OverflowLayoutModule } from '@fundamental-ngx/core/overflow-layout';

import { PortalModule } from '@angular/cdk/portal';
import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { IconModule } from '@fundamental-ngx/core/icon';
import { LinkModule } from '@fundamental-ngx/core/link';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { I18nModule } from '@fundamental-ngx/i18n';
import { BreadcrumbItemComponent } from './breadcrumb-item.component';
import { BreadcrumbComponent } from './breadcrumb.component';

@NgModule({
    imports: [
        CommonModule,
        IconModule,
        PopoverModule,
        MenuModule,
        LinkModule,
        PortalModule,
        PipeModule,
        ContentDensityModule,
        OverflowLayoutModule,
        ButtonModule,
        I18nModule,
        BreadcrumbComponent,
        BreadcrumbItemComponent
    ],
    exports: [BreadcrumbComponent, BreadcrumbItemComponent, LinkModule, ContentDensityModule]
})
export class BreadcrumbModule {}
