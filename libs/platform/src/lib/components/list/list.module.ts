import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListComponent, ListFooter, ListGroupHeader, ListHeader } from './list.component';
import { IconModule, FormModule, ListModule, CheckboxModule, RadioModule } from '@fundamental-ngx/core';
import { PlatformButtonModule } from '../button/button.module';
import { PlatformLinkModule } from '../link/link.module';
import { StandardListItemComponent } from './standard-list-item/standard-list-item.component';

@NgModule({
    declarations: [ListComponent, ListFooter, StandardListItemComponent, ListGroupHeader, ListHeader],
    imports: [
        CommonModule,
        IconModule,
        FormsModule,
        CheckboxModule,
        FormModule,
        ListModule,
        RadioModule,
        PlatformButtonModule,
        PlatformLinkModule

    ],
    exports: [ListComponent, ListFooter, StandardListItemComponent, ListGroupHeader, ListHeader]
})
export class PlatformListModule { }
