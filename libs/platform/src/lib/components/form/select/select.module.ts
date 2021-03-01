import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

import { ButtonModule,
         DynamicComponentService,
         InputGroupModule,
         ListModule,
         TemplateModule,
         PopoverModule,
         IconModule,
        SelectModule } from '@fundamental-ngx/core';
         
import { SelectComponent } from './select/select.component';
import { PlatformAutoCompleteModule } from '../auto-complete/auto-complete.module';
import { OptionComponent } from './option/option.component';

@NgModule({
    declarations: [SelectComponent, OptionComponent],
    imports: [
        CommonModule,
        FormsModule,
        InputGroupModule,
        ListModule,
        ButtonModule,
        OverlayModule,
        PlatformAutoCompleteModule,
        PopoverModule,
        IconModule,
        ReactiveFormsModule,
        SelectModule
    ],
    providers: [DynamicComponentService],
    exports: [SelectComponent, OptionComponent, TemplateModule]
})
export class PlatformSelectModule {}
