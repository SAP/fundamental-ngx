import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SelectModule, IconModule, FormModule as FdFormModule } from '@fundamental-ngx/core';

import { SelectPlatformComponent } from './select.component';

@NgModule({
    declarations: [SelectPlatformComponent],
    imports: [
        CommonModule,
        SelectModule,
        IconModule,
        FormsModule,
        ReactiveFormsModule,
        FdFormModule],
    exports: [SelectPlatformComponent]
})
export class PlatformSelectModule { }
