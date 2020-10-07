import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
    IconModule, FormModule, ListModule,
    AvatarModule, CheckboxModule, RadioModule,
    ObjectMarkerModule, ObjectNumberModule, ObjectIdentifierModule
} from '@fundamental-ngx/core';

import { PlatformLinkModule } from '../../link/link.module';
import { PlatformObjectStatusModule } from '../../object-status/object-status.module';
import { PlatformObjectAttributeModule } from '../../object-attribute/object-attribute.module';
import { ObjectListItemComponent } from './object-list-item.component';
import { ObjectListItemRowComponent } from './object-list-item-row.component';

@NgModule({
    declarations: [ObjectListItemComponent, ObjectListItemRowComponent],
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
        RadioModule,
        ObjectMarkerModule,
        ObjectNumberModule,
        ObjectIdentifierModule,
        PlatformObjectAttributeModule
    ],
    exports: [ObjectListItemComponent, ObjectListItemRowComponent]
})
export class ObjectListItemModule { }
