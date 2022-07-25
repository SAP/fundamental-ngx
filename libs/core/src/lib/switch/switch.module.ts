import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from './switch.component';
import { FormsModule } from '@angular/forms';
import { DeprecatedSwitchCompactDirective } from './deprecated-switch-compact.directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    declarations: [SwitchComponent, DeprecatedSwitchCompactDirective],
    imports: [CommonModule, FormsModule, ContentDensityModule],
    exports: [SwitchComponent, DeprecatedSwitchCompactDirective, ContentDensityModule]
})
export class SwitchModule {}
