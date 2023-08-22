import { Component } from '@angular/core';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';

@Component({
    selector: 'fd-busy-indicator-basic-example',
    templateUrl: './busy-indicator-basic-example.component.html',
    standalone: true,
    imports: [BusyIndicatorComponent]
})
export class BusyIndicatorBasicExampleComponent {}
