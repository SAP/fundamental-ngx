import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { SearchFieldMobileComponent } from './search-field/search-field-mobile.component';

@NgModule({
    declarations: [SearchFieldMobileComponent],
    imports: [CommonModule, BarModule, DialogModule, ButtonModule],
    exports: [SearchFieldMobileComponent]
})
export class PlatformSearchFieldMobileModule {}
