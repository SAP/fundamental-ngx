import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiInputComponent } from './multi-input.component';
import { TokenModule } from '@fundamental-ngx/core/token';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { AutoCompleteModule, PipeModule } from '@fundamental-ngx/cdk/utils';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { FormModule } from '@fundamental-ngx/core/form';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { ListModule } from '@fundamental-ngx/core/list';
import { LinkModule } from '@fundamental-ngx/core/link';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    declarations: [MultiInputComponent],
    imports: [
        CommonModule,
        TokenModule,
        FormsModule,
        ReactiveFormsModule,
        ListModule,
        PopoverModule,
        PipeModule,
        InputGroupModule,
        FormModule,
        CheckboxModule,
        LinkModule,
        AutoCompleteModule,
        ContentDensityModule
    ],
    exports: [MultiInputComponent, ContentDensityModule]
})
export class MultiInputModule {}
