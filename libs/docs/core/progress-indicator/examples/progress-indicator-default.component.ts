import { Component } from '@angular/core';
import { ProgressIndicatorModule } from '@fundamental-ngx/core/progress-indicator';

@Component({
    selector: 'fd-progress-indicator-default',
    templateUrl: './progress-indicator-default.component.html',
    standalone: true,
    imports: [ProgressIndicatorModule]
})
export class ProgressIndicatorDefaultComponent {
    customUnitValueNow = 80;
    customUnitValueMax = 100;
    customUnits = 'MB';

    getLabel(): string {
        return this.customUnitValueNow + ' of ' + this.customUnitValueMax + ' ' + this.customUnits;
    }
}
