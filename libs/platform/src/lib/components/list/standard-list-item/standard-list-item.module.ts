import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
    IconModule, FormModule, CheckboxModule, RadioModule,
    ButtonModule, ListModule, AvatarModule
} from '@fundamental-ngx/core';
import { PlatformLinkModule } from '../../link/link.module';
import { PlatformObjectStatusModule } from '../../object-status/object-status.module';
import { StandardListItemComponent } from './standard-list-item.component';

@NgModule({
    declarations: [StandardListItemComponent],
    imports: [
        CommonModule,
        IconModule,
        FormsModule,
        CheckboxModule,
        FormModule,
        RadioModule,
        ButtonModule,
        PlatformLinkModule,
        ListModule,
        AvatarModule,
        RouterModule,
        PlatformObjectStatusModule

    ],
    exports: [StandardListItemComponent]
})
export class StandardListItemModule { }
