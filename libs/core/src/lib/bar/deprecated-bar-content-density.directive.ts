import { Directive, forwardRef } from '@angular/core';
import { CONTENT_DENSITY_DIRECTIVE, DeprecatedCozyDirective } from '@fundamental-ngx/core/content-density';

@Directive({
    selector: '[fd-bar][cozy]',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => DeprecatedBarContentDensityDirective)
        }
    ]
})
export class DeprecatedBarContentDensityDirective extends DeprecatedCozyDirective {
    constructor() {
        super('[fd-bar]');
    }
}
