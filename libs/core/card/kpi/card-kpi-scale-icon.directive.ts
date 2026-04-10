import { Directive, ElementRef, inject } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-kpi-scale-icon]',
    host: {
        class: 'fd-numeric-content__scale-arrow'
    }
})
export class CardKpiScaleIconDirective implements HasElementRef {
    /** @hidden */
    readonly elementRef = inject(ElementRef);
}
