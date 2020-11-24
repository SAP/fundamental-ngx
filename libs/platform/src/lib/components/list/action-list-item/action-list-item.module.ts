import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListModule, ButtonModule } from '@fundamental-ngx/core';

import { PlatformLinkModule } from '../../link/link.module';
import { ActionListItemComponent } from './action-list-item.component';

@NgModule({
    declarations: [ActionListItemComponent],
    imports: [
        CommonModule,
        ListModule,
        ButtonModule,
        PlatformLinkModule

    ],
    exports: [ActionListItemComponent]
})
export class ActionListItemModule { }
