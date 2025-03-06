import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FocusableItemDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';

@Component({
    selector: 'fd-segmented-button-complex-example',
    templateUrl: './segmented-button-complex-example.component.html',
    imports: [SegmentedButtonModule, FormsModule, ButtonComponent, FocusableItemDirective]
})
export class SegmentedButtonComplexExampleComponent {
    values: string[] = ['first', 'second', 'third'];
    currentValue = '';

    handleValueChange(value: string): void {
        const index = this.currentValue.indexOf(value);
        if (index === -1) {
            this.currentValue = this.currentValue ? `${this.currentValue},${value}` : value;
        } else {
            this.currentValue = this.currentValue
                .split(',')
                .filter((v) => v !== value)
                .join(',');
        }
        alert(`Current value changed to ${this.currentValue}`);
    }
}
