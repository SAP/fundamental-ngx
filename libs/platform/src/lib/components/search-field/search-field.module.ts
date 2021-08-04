import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboboxModule, PopoverModule, MenuModule, PipeModule } from '@fundamental-ngx/core';
import { SearchFieldComponent, SuggestionMatchesPipe, SearchFieldSuggestionDirective } from './search-field.component';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformMenuModule } from '../menu/public_api';
import { IconModule } from '@fundamental-ngx/core/icon';

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
