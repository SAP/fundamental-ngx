import { Component, signal } from '@angular/core';
import { ProgressIndicator } from '@fundamental-ngx/ui5-webcomponents/progress-indicator';

// Import Fundamental Styles
import 'fundamental-styles/dist/form-item.css';
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';

@Component({
    selector: 'ui5-custom-display-progress-indicator',
    templateUrl: './custom-display-progress-indicator.html',
    standalone: true,
    imports: [ProgressIndicator]
})
export class CustomDisplayProgressIndicatorExample {
    readonly customDisplayExamples = signal([
        {
            value: 25,
            displayValue: 'Initializing...',
            description: 'Custom loading text'
        },
        {
            value: 50,
            displayValue: '5 of 10 files',
            description: 'File processing progress'
        },
        {
            value: 75,
            displayValue: '3 min remaining',
            description: 'Time-based progress'
        },
        {
            value: 90,
            displayValue: 'Almost done!',
            description: 'Encouraging message'
        },
        {
            value: 100,
            displayValue: 'Complete ✓',
            description: 'Success indicator'
        }
    ]);
}
