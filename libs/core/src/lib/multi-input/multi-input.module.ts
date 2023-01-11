import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiInputComponent } from './multi-input.component';
import { TokenModule } from '@fundamental-ngx/core/token';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { FormModule } from '@fundamental-ngx/core/form';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { ListModule } from '@fundamental-ngx/core/list';
import { LinkModule } from '@fundamental-ngx/core/link';
import { AutoCompleteModule } from '@fundamental-ngx/cdk/utils';
import { DeprecatedMultiInputCompactDirective } from './deprecated-multi-input-compact.directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    declarations: [MultiInputComponent, DeprecatedMultiInputCompactDirective],
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
    exports: [MultiInputComponent, DeprecatedMultiInputCompactDirective, ContentDensityModule]
})
export class MultiInputModule {}
