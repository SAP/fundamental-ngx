import { Component, signal } from '@angular/core';
import { ValueState } from '@fundamental-ngx/ui5-webcomponents-base/types';
import { TextArea } from '@fundamental-ngx/ui5-webcomponents/text-area';

// Import Fundamental Styles
import 'fundamental-styles/dist/form-item.css';
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-textarea-value-states-sample',
    templateUrl: './value-states.html',
    standalone: true,
    imports: [TextArea]
})
export class TextAreaValueStatesSample {
    readonly valueStates = signal([
        { state: ValueState.None, label: 'None (Default)', description: 'Standard state' },
        { state: ValueState.Positive, label: 'Positive', description: 'Success state' },
        { state: ValueState.Critical, label: 'Critical', description: 'Warning state' },
        { state: ValueState.Negative, label: 'Negative', description: 'Error state' },
        { state: ValueState.Information, label: 'Information', description: 'Info state' }
    ]);

    readonly stateValues = signal({
        None: 'Normal text input',
        Positive: 'Valid input confirmed',
        Critical: 'Please check this input',
        Negative: 'Invalid input detected',
        Information: 'Additional info available'
    });
}
