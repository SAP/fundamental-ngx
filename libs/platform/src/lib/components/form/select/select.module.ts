import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SelectModule, IconModule, FormModule } from '@fundamental-ngx/core';

import { SelectComponent } from './select.component';


@NgModule({
    declarations: [SelectComponent],
    imports: [
            CommonModule,
            FormsModule,
            SelectModule,
            IconModule,
            FormModule,
            ReactiveFormsModule],
    exports: [SelectComponent]
})
export class PlatformSelectModule {}
