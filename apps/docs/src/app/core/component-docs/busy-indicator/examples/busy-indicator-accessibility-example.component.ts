import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'fd-busy-indicator-accessibility-example',
    templateUrl: './busy-indicator-accessibility-example.component.html',
})
export class BusyIndicatorAccessibilityExampleComponent implements OnInit {
    minValue = 0;
    maxValue = 100;
    currentValue = 0;

    ngOnInit(): void {
        setInterval(() => this.currentValue++, 4000);
    }
}
