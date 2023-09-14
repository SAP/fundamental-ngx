import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule, DynamicComponentService, PipeModule } from '@fundamental-ngx/cdk/utils';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { FormModule } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ListModule } from '@fundamental-ngx/core/list';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { TokenComponent, TokenizerComponent, TokenizerInputDirective } from '@fundamental-ngx/core/token';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { I18nModule } from '@fundamental-ngx/i18n';
import { MultiComboboxComponent } from './multi-combobox.component';
import { SelectAllTogglerComponent } from './select-all-toggler/select-all-toggler.component';

@NgModule({
    imports: [
        CommonModule,
        I18nModule,
        PopoverModule,
        CheckboxModule,
        InputGroupModule,
        TokenComponent,
        TokenizerComponent,
        TokenizerInputDirective,
        FormModule,
        ListModule,
        FormsModule,
        PipeModule,
        AutoCompleteModule,
        ContentDensityModule,
        ToolbarModule
    ],
    declarations: [MultiComboboxComponent, SelectAllTogglerComponent],
    exports: [MultiComboboxComponent],
    providers: [DynamicComponentService]
})
export class MultiComboboxModule {}
