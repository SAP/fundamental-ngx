import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegmentedButtonComponent } from './segmented-button.component';
import { SegmentedButtonDirective } from './segmented-button.directive';

@NgModule({
    imports: [CommonModule],
    exports: [SegmentedButtonComponent, SegmentedButtonDirective],
    declarations: [SegmentedButtonComponent, SegmentedButtonDirective]
})
export class SegmentedButtonModule { }
