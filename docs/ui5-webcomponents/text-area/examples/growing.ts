import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { TextArea } from '@fundamental-ngx/ui5-webcomponents/text-area';

// Import Fundamental Styles
import 'fundamental-styles/dist/form-item.css';
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-textarea-growing-sample',
    templateUrl: './growing.html',
    standalone: true,
    imports: [TextArea]
})
export class TextAreaGrowingSample {
    readonly fixedHeightValue = signal(
        'This is a fixed height textarea that demonstrates the difference from growing textareas. When you have more content than can fit in the visible rows, the textarea will show a scrollbar instead of expanding.'
    );

    onTextChange(event: UI5WrapperCustomEvent<TextArea, 'ui5Change'>): void {
        console.log('Text changed', event);
    }
}
