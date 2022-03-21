import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

import { IconModule } from '@fundamental-ngx/core/icon';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { DynamicComponentService, PipeModule } from '@fundamental-ngx/core/utils';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';

import { SearchFieldComponent, SearchFieldSuggestionDirective, SuggestionMatchesPipe } from './search-field.component';
import { I18nModule } from '@fundamental-ngx/i18n';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OverlayModule,
        IconModule,
        MenuModule,
        PipeModule,
        PlatformMenuModule,
        I18nModule
    ],
    exports: [SearchFieldComponent, SearchFieldSuggestionDirective, SuggestionMatchesPipe],
    declarations: [SearchFieldComponent, SearchFieldSuggestionDirective, SuggestionMatchesPipe],
    providers: [DynamicComponentService]
})
export class PlatformSearchFieldModule {}
