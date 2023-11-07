import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';

@Component({
    selector: 'fd-segmented-button-complex-example',
    templateUrl: './segmented-button-complex-example.component.html',
    standalone: true,
    imports: [SegmentedButtonModule, FormsModule, NgFor, ButtonComponent]
})
export class SegmentedButtonComplexExampleComponent {
    values: string[] = ['first', 'second', 'third'];
    currentValue = '';

    handleValueChange(value: string): void {
        this.currentValue = value;
        alert(`Current value changed to ${value}`);
    }
}
