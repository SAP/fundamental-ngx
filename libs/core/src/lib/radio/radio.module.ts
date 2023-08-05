import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { RadioButtonComponent } from './radio-button/radio-button.component';

@NgModule({
    declarations: [RadioButtonComponent],
    exports: [RadioButtonComponent, ContentDensityModule],
    imports: [CommonModule, FormsModule, ContentDensityModule]
})
export class RadioModule {}
