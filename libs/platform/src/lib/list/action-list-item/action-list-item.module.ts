import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { ListModule } from '@fundamental-ngx/core/list';
import { PlatformLinkModule } from '@fundamental-ngx/platform/link';
import { ActionListItemComponent } from './action-list-item.component';

@NgModule({
    declarations: [ActionListItemComponent],
    imports: [CommonModule, ListModule, ButtonModule, PlatformLinkModule],
    exports: [ActionListItemComponent]
})
export class ActionListItemModule {}
