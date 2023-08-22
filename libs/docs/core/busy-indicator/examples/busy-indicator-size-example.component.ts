import { Component } from '@angular/core';
import { BusyIndicatorSize } from '@fundamental-ngx/core/busy-indicator';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';
import { NgFor } from '@angular/common';

@Component({
    selector: 'fd-busy-indicator-size-example',
    templateUrl: './busy-indicator-size-example.component.html',
    standalone: true,
    imports: [NgFor, BusyIndicatorComponent]
})
export class BusyIndicatorSizeExampleComponent {
    sizes: BusyIndicatorSize[] = ['s', 'm', 'l'];
}
