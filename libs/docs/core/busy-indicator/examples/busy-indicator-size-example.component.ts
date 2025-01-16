import { Component } from '@angular/core';
import { BusyIndicatorComponent, BusyIndicatorSize } from '@fundamental-ngx/core/busy-indicator';

@Component({
    selector: 'fd-busy-indicator-size-example',
    templateUrl: './busy-indicator-size-example.component.html',
    imports: [BusyIndicatorComponent]
})
export class BusyIndicatorSizeExampleComponent {
    sizes: BusyIndicatorSize[] = ['s', 'm', 'l'];
}
