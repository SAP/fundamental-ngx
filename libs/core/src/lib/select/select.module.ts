import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopoverModule } from '@fundamental-ngx/core/popover';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { IconModule } from '@fundamental-ngx/core/icon';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { ListModule } from '@fundamental-ngx/core/list';
import { I18nModule } from '@fundamental-ngx/i18n';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { SelectComponent } from './select.component';
import { OptionComponent } from './option/option.component';

@NgModule({
    declarations: [SelectComponent, OptionComponent],
    exports: [SelectComponent, OptionComponent, ContentDensityModule],
    imports: [
        BusyIndicatorModule,
        CommonModule,
        PopoverModule,
        ButtonModule,
        IconModule,
        ListModule,
        ContentDensityModule,
        I18nModule
    ]
})
export class SelectModule {}
