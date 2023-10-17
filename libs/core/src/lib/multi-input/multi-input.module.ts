import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule, MultiAnnouncerModule, PipeModule } from '@fundamental-ngx/cdk/utils';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { FormModule } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { LinkModule } from '@fundamental-ngx/core/link';
import { ListModule } from '@fundamental-ngx/core/list';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { TokenModule } from '@fundamental-ngx/core/token';
import { I18nModule } from '@fundamental-ngx/i18n';
import { DeprecatedMultiInputCompactDirective } from './deprecated-multi-input-compact.directive';
import { MultiInputComponent } from './multi-input.component';

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
        ContentDensityModule,
        I18nModule,
        MultiAnnouncerModule
    ],
    exports: [MultiInputComponent, DeprecatedMultiInputCompactDirective, ContentDensityModule]
})
export class MultiInputModule {}
