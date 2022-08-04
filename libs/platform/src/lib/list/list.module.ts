import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormModule } from '@fundamental-ngx/core/form';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { ListModule } from '@fundamental-ngx/core/list';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { InfiniteScrollModule } from '@fundamental-ngx/core/infinite-scroll';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/shared';
import { ListComponent, ListFooter, ListGroupHeader } from './list.component';
import { ListItemDef } from './base-list-item';
import { I18nModule } from '@fundamental-ngx/i18n';

@NgModule({
    declarations: [ListComponent, ListFooter, ListGroupHeader, ListItemDef],
    imports: [
        CommonModule,
        FormsModule,
        FormModule,
        I18nModule,
        ToolbarModule,
        ListModule,
        PipeModule,
        BusyIndicatorModule,
        InfiniteScrollModule,
        PlatformContentDensityDeprecationsModule,
        ContentDensityModule
    ],
    exports: [
        ListComponent,
        ListFooter,
        ListGroupHeader,
        ListItemDef,
        PlatformContentDensityDeprecationsModule,
        ContentDensityModule
    ]
})
export class PlatformListModule {}
