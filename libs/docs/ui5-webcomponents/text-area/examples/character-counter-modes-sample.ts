import { Component } from '@angular/core';
import { TextArea } from '@fundamental-ngx/ui5-webcomponents/text-area';
import { TextAreaCounterMode } from '@fundamental-ngx/ui5-webcomponents/types';

// Import Fundamental Styles
import 'fundamental-styles/dist/form-item.css';
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-textarea-character-counter-modes-sample',
    templateUrl: './character-counter-modes-sample.html',
    imports: [TextArea]
})
export class TextAreaCharacterCounterModesSample {
    protected readonly _counterMode = TextAreaCounterMode;
}
