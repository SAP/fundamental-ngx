import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoLabelComponent } from './info-label.component';
import { InfoLabelModule } from '@fundamental-ngx/core';

@NgModule({
    declarations: [InfoLabelComponent],
    imports: [
        CommonModule,
        InfoLabelModule
    ],
    exports: [InfoLabelComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
    
})
export class PlatformInfoLabelModule {}
