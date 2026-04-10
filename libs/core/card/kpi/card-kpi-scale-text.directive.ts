import { Directive, ElementRef, inject } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-kpi-scale-text]',
    host: {
        class: 'fd-numeric-content__scale-text'
    }
})
export class CardKpiScaleTextDirective implements HasElementRef {
    /** @hidden */
    readonly elementRef = inject(ElementRef);
}
