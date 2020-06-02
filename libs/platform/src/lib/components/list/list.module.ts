import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { IconModule, FormModule, ListModule } from '@fundamental-ngx/core';
import { PlatformButtonModule } from '../button/button.module';
import { ListItemComponent } from './list-item/list-item.component';



@NgModule({
    declarations: [ListComponent, ListItemComponent],
    imports: [
        CommonModule,
        PlatformButtonModule,
        IconModule,
        FormsModule,
        FormModule,
        ListModule
    ],
    exports: [ListComponent]
})
export class PlatformListModule { }
