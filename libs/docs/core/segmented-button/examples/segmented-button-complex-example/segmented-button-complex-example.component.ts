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
        this.currentValue = value;
        alert(`Current value changed to ${value}`);
    }
}
