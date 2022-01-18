import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressIndicatorComponent } from './progress-indicator.component';
import { PopoverModule } from '@fundamental-ngx/core/popover';

@NgModule({
    declarations: [ProgressIndicatorComponent],
    imports: [CommonModule, PopoverModule],
    exports: [ProgressIndicatorComponent]
})
export class ProgressIndicatorModule {}
