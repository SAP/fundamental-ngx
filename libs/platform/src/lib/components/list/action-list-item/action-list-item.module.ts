import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormModule, ListModule, ButtonModule } from '@fundamental-ngx/core';

import { PlatformLinkModule } from '../../link/link.module';
import { ActionListItemComponent } from './action-list-item.component';

@NgModule({
    declarations: [ActionListItemComponent],
    imports: [
        CommonModule,
        FormsModule,
        FormModule,
        ListModule,
        ButtonModule,
        PlatformLinkModule

    ],
    exports: [ActionListItemComponent]
})
export class ActionListItemModule { }
