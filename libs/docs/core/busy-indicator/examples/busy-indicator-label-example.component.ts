import { Component } from '@angular/core';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';
import { BusyIndicatorExtendedDirective } from '@fundamental-ngx/core/busy-indicator';

@Component({
    selector: 'fd-busy-indicator-label-example',
    templateUrl: './busy-indicator-label-example.component.html',
    standalone: true,
    imports: [BusyIndicatorExtendedDirective, BusyIndicatorComponent]
})
export class BusyIndicatorLabelExampleComponent {}
