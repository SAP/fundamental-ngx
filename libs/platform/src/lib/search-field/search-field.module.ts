import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

import { IconModule } from '@fundamental-ngx/core/icon';
import { ComboboxModule } from '@fundamental-ngx/core/combobox';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { SearchFieldComponent, SearchFieldSuggestionDirective, SuggestionMatchesPipe } from './search-field.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OverlayModule,
        IconModule,
        ComboboxModule,
        PopoverModule,
        MenuModule,
        PipeModule,
        PlatformMenuModule
    ],
    exports: [SearchFieldComponent, SearchFieldSuggestionDirective, SuggestionMatchesPipe],
    declarations: [SearchFieldComponent, SearchFieldSuggestionDirective, SuggestionMatchesPipe]
})
export class PlatformSearchFieldModule {}
