import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListComponent, ListFooter, ListGroupHeader } from './list.component';
import { FormModule, ListModule, ToolbarModule } from '@fundamental-ngx/core';
import { PlatformButtonModule } from '../button/button.module';
import { PlatformLinkModule } from '../link/link.module';

@NgModule({
    declarations: [ListComponent, ListFooter, ListGroupHeader],
    imports: [
        CommonModule,
        FormsModule,
        FormModule,
        ListModule,
        PlatformButtonModule,
        PlatformLinkModule,
        ToolbarModule

    ],
    exports: [ListComponent, ListFooter, ListGroupHeader]
})
export class PlatformListModule { }
