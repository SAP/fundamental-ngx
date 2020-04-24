import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoLabelPlatformComponent } from './info-label.component';
import { InfoLabelModule } from '@fundamental-ngx/core';

@NgModule({
    declarations: [InfoLabelPlatformComponent],
    imports: [
        CommonModule,
        InfoLabelModule
    ],
    exports: [InfoLabelPlatformComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
    
})
export class PlatformInfoLabelModule {}
