import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListComponent, ListFooter, ListGroupHeader } from './list.component';
import { FormModule, ListModule, ToolbarModule, DragAndDropModule } from '@fundamental-ngx/core';
import { PlatformButtonModule } from '../button/button.module';
import { PlatformLinkModule } from '../link/link.module';
import { BaseListItem } from './base-list-item';

@NgModule({
    declarations: [ListComponent, ListFooter, ListGroupHeader, BaseListItem],
    imports: [
        CommonModule,
        FormsModule,
        FormModule,
        ListModule,
        PlatformButtonModule,
        PlatformLinkModule,
        ToolbarModule,
        DragAndDropModule

    ],
    exports: [ListComponent, ListFooter, ListGroupHeader, BaseListItem]
})
export class PlatformListModule { }
