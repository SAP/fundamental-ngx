import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from './switch.component';
import { I18nModule } from '@fundamental-ngx/i18n';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [SwitchComponent],
    imports: [CommonModule, FormsModule, I18nModule],
    exports: [SwitchComponent]
})
export class SwitchModule {}
