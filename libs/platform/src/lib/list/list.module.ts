import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormModule } from '@fundamental-ngx/core/form';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { ListModule } from '@fundamental-ngx/core/list';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { InfiniteScrollModule } from '@fundamental-ngx/core/infinite-scroll';
import { ListComponent, ListFooter, ListGroupHeader } from './list.component';
import { ListItemDef } from './base-list-item';

@NgModule({
    declarations: [ListComponent, ListFooter, ListGroupHeader, ListItemDef],
    imports: [
        CommonModule,
        FormsModule,
        FormModule,
        ToolbarModule,
        ListModule,
        BusyIndicatorModule,
        InfiniteScrollModule
    ],
    exports: [ListComponent, ListFooter, ListGroupHeader, ListItemDef]
})
export class PlatformListModule {}
