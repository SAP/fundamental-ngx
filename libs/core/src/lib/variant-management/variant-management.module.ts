import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VariantManagementComponent } from './variant-management.component';
import { ListModule } from '../list/public_api';
import { PopoverModule } from '../popover/public_api';
import { BarModule } from '../bar/bar.module';
import { DialogModule } from '../dialog/public_api';
import { FormModule } from '../form/public_api';
import { CheckboxModule } from '../checkbox/public_api';
import { InputGroupModule } from '../input-group/public_api';
import { TableModule } from '../table/public_api';
import { IconModule } from '../icon/public_api';
import { RadioModule } from '../radio/public_api';
import { TitleModule } from '../title/public_api';
import { ButtonModule } from '../button/public_api';
import { PipeModule } from '../utils/public_api';

@NgModule({
    declarations: [
        VariantManagementComponent
    ],
    imports: [
        CommonModule,
        ListModule,
        PopoverModule,
        BarModule,
        DialogModule,
        FormModule,
        CheckboxModule,
        InputGroupModule,
        TableModule,
        IconModule,
        RadioModule,
        FormsModule,
        TitleModule,
        ButtonModule,
        PipeModule
    ],
    exports: [
        VariantManagementComponent
    ]
})
export class VariantManagementModule { }
