import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconModule, FormModule, ListModule, CheckboxModule, RadioModule, ToolbarModule, ButtonModule } from '@fundamental-ngx/core';
import { PlatformLinkModule } from '../../link/link.module';
import { StandardListItemComponent } from './standard-list-item.component';

@NgModule({
    declarations: [StandardListItemComponent],
    imports: [
        CommonModule,
        IconModule,
        FormsModule,
        CheckboxModule,
        FormModule,
        ListModule,
        RadioModule,
        ButtonModule,
        PlatformLinkModule,
        ToolbarModule

    ],
    exports: [StandardListItemComponent]
})
export class StandardListItemModule { }
