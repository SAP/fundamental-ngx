import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCozyDirective } from '@fundamental-ngx/core/content-density';
import { Directive, forwardRef } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-slider[cozy]',
    providers: [{ provide: CONTENT_DENSITY_DIRECTIVE, useExisting: forwardRef(() => DeprecatedSliderCozyDirective) }]
})
export class DeprecatedSliderCozyDirective extends DeprecatedCozyDirective {
    /** @hidden */
    constructor() {
        super('fd-slider');
    }
}
