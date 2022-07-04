import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@fundamental-ngx/core/icon';
import { InfoLabelComponent } from './info-label.component';

@NgModule({
    declarations: [InfoLabelComponent],
    imports: [CommonModule, IconModule],
    exports: [InfoLabelComponent]
})
export class InfoLabelModule {}
