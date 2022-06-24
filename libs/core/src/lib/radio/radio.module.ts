import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { DeprecatedRadioButtonCompactDirective } from './deprecated-radio-button-compact.directive';

@NgModule({
    declarations: [RadioButtonComponent, DeprecatedRadioButtonCompactDirective],
    exports: [RadioButtonComponent, ContentDensityModule, DeprecatedRadioButtonCompactDirective],
    imports: [CommonModule, FormsModule, ContentDensityModule]
})
export class RadioModule {}
