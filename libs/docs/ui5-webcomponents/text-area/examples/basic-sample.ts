import { Component, signal } from '@angular/core';
import { TextArea } from '@fundamental-ngx/ui5-webcomponents/text-area';

// Import Fundamental Styles
import 'fundamental-styles/dist/form-item.css';

@Component({
    selector: 'ui5-textarea-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [TextArea]
})
export class TextAreaBasicSample {
    readonly placeholderValue = signal('Enter your text here...');
}
