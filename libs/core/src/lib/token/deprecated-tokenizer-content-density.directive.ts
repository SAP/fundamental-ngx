import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCompactDirective } from '@fundamental-ngx/core/content-density';
import { Directive, forwardRef } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-tokenizer[compact], fd-token[compact]',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => DeprecatedTokenizerContentDensityDirective)
        }
    ]
})
export class DeprecatedTokenizerContentDensityDirective extends DeprecatedCompactDirective {
    /** @hidden */
    constructor() {
        super('fd-tokenizer[compact], fd-token');
    }
}
