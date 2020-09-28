import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconModule, FormModule, ListModule, AvatarModule, CheckboxModule, RadioModule } from '@fundamental-ngx/core';
import { PlatformLinkModule } from '../../link/link.module';
import { PlatformObjectStatusModule } from '../../object-status/object-status.module';
import { ObjectListItemComponent } from './object-list-item.component';

@NgModule({
    declarations: [ObjectListItemComponent],
    imports: [
        CommonModule,
        IconModule,
        FormsModule,
        FormModule,
        ListModule,
        PlatformLinkModule,
        RouterModule,
        AvatarModule,
        PlatformObjectStatusModule,
        CheckboxModule,
        RadioModule
    ],
    exports: [ObjectListItemComponent]
})
export class ObjectListItemModule { }
