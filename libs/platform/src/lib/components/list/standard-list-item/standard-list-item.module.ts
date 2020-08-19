import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
    IconModule, FormModule, CheckboxModule, RadioModule,
    ToolbarModule, ButtonModule,
    ListModule, AvatarModule
} from '@fundamental-ngx/core';
import { PlatformLinkModule } from '../../link/link.module';
import { StandardListItemComponent } from './standard-list-item.component';
import { ListItemDef } from '../base-list-item';

@NgModule({
    declarations: [StandardListItemComponent, ListItemDef],
    imports: [
        CommonModule,
        IconModule,
        FormsModule,
        CheckboxModule,
        FormModule,
        RadioModule,
        ButtonModule,
        PlatformLinkModule,
        ToolbarModule,
        ListModule,
        AvatarModule,
        RouterModule

    ],
    exports: [StandardListItemComponent, ListItemDef]
})
export class StandardListItemModule { }
