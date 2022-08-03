import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

import { IconModule } from '@fundamental-ngx/core/icon';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { DynamicComponentService, PipeModule } from '@fundamental-ngx/core/utils';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';

import { SearchFieldComponent, SearchFieldSuggestionDirective, SuggestionMatchesPipe } from './search-field.component';
import { I18nModule } from '@fundamental-ngx/i18n';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/shared';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OverlayModule,
        IconModule,
        MenuModule,
        PipeModule,
        PlatformMenuModule,
        PlatformContentDensityDeprecationsModule,
        ContentDensityModule,
        I18nModule
    ],
    exports: [
        SearchFieldComponent,
        SearchFieldSuggestionDirective,
        SuggestionMatchesPipe,
        PlatformContentDensityDeprecationsModule,
        ContentDensityModule
    ],
    declarations: [SearchFieldComponent, SearchFieldSuggestionDirective, SuggestionMatchesPipe],
    providers: [DynamicComponentService]
})
export class PlatformSearchFieldModule {}
