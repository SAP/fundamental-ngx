import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusIndicatorComponent } from './status-indicator.component';

@NgModule({
    declarations: [StatusIndicatorComponent],
    imports: [CommonModule],
    exports: [StatusIndicatorComponent]
})
export class StatusIndicatorModule {}
