import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressIndicatorComponent } from './progress-indicator.component';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';

@NgModule({
    declarations: [ProgressIndicatorComponent],
    imports: [CommonModule, PopoverModule, SkeletonModule],
    exports: [ProgressIndicatorComponent]
})
export class ProgressIndicatorModule {}
