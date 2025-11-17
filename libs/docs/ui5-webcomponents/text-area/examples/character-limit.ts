import { Component, signal } from '@angular/core';
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

    onExceededLimitTextChange(event: CustomEvent): void {
        this.exceededValueState.set((event.target as any).value.length > 100 ? ValueState.Critical : ValueState.None);
    }
}
