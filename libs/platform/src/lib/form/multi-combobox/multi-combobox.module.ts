import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { DynamicComponentService, TemplateModule, PipeModule } from '@fundamental-ngx/core/utils';
import { FormModule } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ListModule } from '@fundamental-ngx/core/list';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { TokenModule } from '@fundamental-ngx/core/token';
import { I18nModule } from '@fundamental-ngx/i18n';
import { PlatformListModule, StandardListItemModule } from '@fundamental-ngx/platform/list';
import { MultiComboboxComponent } from './multi-combobox/multi-combobox.component';
import { PlatformAutoCompleteModule } from '../auto-complete/auto-complete.module';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/shared';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    declarations: [MultiComboboxComponent],
    imports: [
        CommonModule,
        FormsModule,
        CheckboxModule,
        InputGroupModule,
        PipeModule,
        TokenModule,
        ListModule,
        ButtonModule,
        FormModule,
        PopoverModule,
        PlatformListModule,
        StandardListItemModule,
        PlatformAutoCompleteModule,
        I18nModule,
        PlatformContentDensityDeprecationsModule,
        ContentDensityModule
    ],
    providers: [DynamicComponentService],
    exports: [MultiComboboxComponent, TemplateModule, PlatformContentDensityDeprecationsModule, ContentDensityModule]
})
export class PlatformMultiComboboxModule {}
