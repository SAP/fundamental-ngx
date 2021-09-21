import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarModule, ButtonModule, DialogModule } from '@fundamental-ngx/core';
import { ComboboxMobileComponent } from '@fundamental-ngx/platform';
import { SearchFieldMobileComponent } from './search-field-mobile.component';

@NgModule({
    declarations: [SearchFieldMobileComponent],
    imports: [
        CommonModule,
        BarModule,
        DialogModule,
        ButtonModule
    ],
    entryComponents: [ComboboxMobileComponent],
    exports: [SearchFieldMobileComponent]
})
export class PlatformSearchFieldMobileModule {}
