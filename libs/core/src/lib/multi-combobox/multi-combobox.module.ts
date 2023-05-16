import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { FormModule } from '@fundamental-ngx/core/form';
import { ListModule } from '@fundamental-ngx/core/list';
import { TokenModule } from '@fundamental-ngx/core/token';
import { AutoCompleteModule, DynamicComponentService, PipeModule } from '@fundamental-ngx/cdk/utils';
import { I18nModule } from '@fundamental-ngx/i18n';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { MultiComboboxComponent } from './multi-combobox.component';
import { SelectAllTogglerComponent } from './select-all-toggler.component';

@NgModule({
    imports: [
        CommonModule,
        I18nModule,
        PopoverModule,
        CheckboxModule,
        InputGroupModule,
        TokenModule,
        FormModule,
        ListModule,
        FormsModule,
        PipeModule,
        AutoCompleteModule,
        ContentDensityModule
    ],
    declarations: [MultiComboboxComponent, SelectAllTogglerComponent],
    exports: [MultiComboboxComponent],
    providers: [DynamicComponentService]
})
export class MultiComboboxModule {}
