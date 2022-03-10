import { TemplateRefDirective } from '@fundamental-ngx/fn/utils';
import { Directive } from '@angular/core';
import { FN_CHECKBOX_LABEL } from './checkbox.tokens';

@Directive({
    selector: '[fnCheckboxLabel]',
    providers: [
        {
            provide: FN_CHECKBOX_LABEL,
            useExisting: CheckboxLabelDirective
        }
    ]
})
export class CheckboxLabelDirective extends TemplateRefDirective<void> {}
