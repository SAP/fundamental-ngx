import { Component } from '@angular/core';
import { ProgressIndicatorComponent } from '@fundamental-ngx/core/progress-indicator';

@Component({
    selector: 'fd-progress-indicator-state',
    templateUrl: './progress-indicator-state.component.html',
    standalone: true,
    imports: [ProgressIndicatorComponent]
})
export class ProgressIndicatorStateComponent {
    customUnitValueNow = 45;
    customUnitValueMax = 100;
    customUnits = 'MB';

    getLabel(): string {
        return this.customUnitValueNow + ' of ' + this.customUnitValueMax + ' ' + this.customUnits;
    }
}
