import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FocusableItemDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';

@Component({
    selector: 'fd-segmented-button-toggle-example',
    templateUrl: './segmented-button-toggle-example.component.html',
    imports: [SegmentedButtonModule, FormsModule, ButtonComponent, FocusableItemDirective]
})
export class SegmentedButtonToggleExampleComponent {
    value: string[] = ['first'];

    values: string[] = ['first', 'second', 'third'];
    currentValue: string[] = [];

    handleValueChange(value: string): void {
        alert('Button with value "' + value + '" was clicked');
    }
}
