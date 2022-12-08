import { Component } from '@angular/core';

@Component({
    selector: 'fd-segmented-button-complex-example',
    templateUrl: './segmented-button-complex-example.component.html'
})
export class SegmentedButtonComplexExampleComponent {
    values: string[] = ['first', 'second', 'third'];
    currentValue = '';

    handleValueChange(value: string): void {
        this.currentValue = value;
        alert(`Current value changed to ${value}`);
    }
}
