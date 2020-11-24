import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IconModule, FormModule, ListModule } from '@fundamental-ngx/core';

import { PlatformLinkModule } from '../../link/link.module';
import { DisplayListItemComponent } from './display-list-item.component';

@NgModule({
    declarations: [DisplayListItemComponent],
    imports: [
        CommonModule,
        IconModule,
        FormsModule,
        FormModule,
        ListModule,
        PlatformLinkModule,
        RouterModule

    ],
    exports: [DisplayListItemComponent]
})
export class DisplayListItemModule { }
