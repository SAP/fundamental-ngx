import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from './switch.component';
import { I18nModule } from '@fundamental-ngx/i18n';
import { FormsModule } from '@angular/forms';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    declarations: [SwitchComponent],
    imports: [CommonModule, FormsModule, ContentDensityModule, I18nModule],
    exports: [SwitchComponent, ContentDensityModule]
})
export class SwitchModule {}
