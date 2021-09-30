import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoLabelModule } from '@fundamental-ngx/core/info-label';
import { InfoLabelComponent } from './info-label.component';

@NgModule({
    declarations: [InfoLabelComponent],
    imports: [
        CommonModule,
        InfoLabelModule
    ],
    exports: [InfoLabelComponent]
})
export class PlatformInfoLabelModule {}
