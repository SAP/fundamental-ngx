import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { ValueState } from '@fundamental-ngx/ui5-webcomponents-base/types';
import { TextArea } from '@fundamental-ngx/ui5-webcomponents/text-area';

// Import Fundamental Styles
import 'fundamental-styles/dist/form-item.css';
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-textarea-character-limit-sample',
    templateUrl: './character-limit.html',
    standalone: true,
    imports: [TextArea]
})
export class TextAreaCharacterLimitSample {
    readonly exceededValueState = signal(ValueState.None);

    onExceededLimitTextChange(event: UI5WrapperCustomEvent<TextArea, 'ui5Input'>): void {
        this.exceededValueState.set(event.target?.['value'].length > 100 ? ValueState.Critical : ValueState.None);
    }
}
