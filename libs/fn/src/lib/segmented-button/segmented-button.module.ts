import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SegmentedButtonComponent } from './segmented-button.component';
import { SelectableButtonDirective } from './selectable-button.directive';
import { DisabledBehaviorModule } from '@fundamental-ngx/fn/cdk';

@NgModule({
    imports: [CommonModule, DisabledBehaviorModule],
    exports: [SegmentedButtonComponent, SelectableButtonDirective, DisabledBehaviorModule],
    declarations: [SegmentedButtonComponent, SelectableButtonDirective]
})
export class SegmentedButtonModule {}
