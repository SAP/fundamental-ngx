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
import { I18nModule } from '@fundamental-ngx/i18n';
import { ActionListItemModule } from './action-list-item/action-list-item.module';
import { DisplayListItemModule } from './display-list-item/display-list-item.module';
import { ListFooterComponent } from './list-group-footer.component';
import { ListGroupHeaderComponent } from './list-group-header.component';
import { ListComponent } from './list.component';
import { ListItemDef } from './base-list-item';
import { ObjectListItemModule } from './object-list-item/object-list-item.module';
import { StandardListItemModule } from './standard-list-item/standard-list-item.module';
import { FreeContentListItemComponent } from './free-content-list-item/free-content-list-item.component';

@NgModule({
    declarations: [
        ListComponent,
        ListFooterComponent,
        ListGroupHeaderComponent,
        ListItemDef,
        FreeContentListItemComponent
    ],
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
        ContentDensityModule,
        StandardListItemModule,
        ObjectListItemModule,
        DisplayListItemModule,
        ActionListItemModule
    ],
    exports: [
        ListComponent,
        ListFooterComponent,
        ListGroupHeaderComponent,
        ListItemDef,
        PlatformContentDensityDeprecationsModule,
        ContentDensityModule,
        StandardListItemModule,
        ObjectListItemModule,
        DisplayListItemModule,
        ActionListItemModule,
        FreeContentListItemComponent
    ]
})
export class PlatformListModule {}
