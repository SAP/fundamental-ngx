import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IconModule } from '@fundamental-ngx/core/icon';
import { FormModule } from '@fundamental-ngx/core/form';
import { ListModule } from '@fundamental-ngx/core/list';
import { PlatformLinkModule } from '@fundamental-ngx/platform/link';
import { DisplayListItemComponent } from './display-list-item.component';

@NgModule({
    declarations: [DisplayListItemComponent],
    imports: [CommonModule, IconModule, FormsModule, FormModule, ListModule, PlatformLinkModule, RouterModule],
    exports: [DisplayListItemComponent]
})
export class DisplayListItemModule {}
