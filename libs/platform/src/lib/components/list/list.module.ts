import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormModule, ToolbarModule, ListModule, BusyIndicatorModule, InfiniteScrollModule } from '@fundamental-ngx/core';
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
export class PlatformListModule { }
