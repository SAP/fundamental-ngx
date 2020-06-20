import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconModule, FormModule, ListModule, CheckboxModule, RadioModule, ToolbarModule } from '@fundamental-ngx/core';
import { PlatformButtonModule } from '../../button/button.module';
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
        PlatformButtonModule,
        PlatformLinkModule,
        ToolbarModule

    ],
    exports: [StandardListItemComponent]
})
export class StandardListItemModule { }
