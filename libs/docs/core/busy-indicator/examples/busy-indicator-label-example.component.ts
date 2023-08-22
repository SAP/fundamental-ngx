import { Component } from '@angular/core';
import { BusyIndicatorComponent, BusyIndicatorExtendedDirective } from '@fundamental-ngx/core/busy-indicator';

@Component({
    selector: 'fd-busy-indicator-label-example',
    templateUrl: './busy-indicator-label-example.component.html',
    standalone: true,
    imports: [BusyIndicatorExtendedDirective, BusyIndicatorComponent]
})
export class BusyIndicatorLabelExampleComponent {}
