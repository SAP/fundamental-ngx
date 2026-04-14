import { Directive, ElementRef, inject } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { CLASS_NAME } from '../constants';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-kpi-scale-text]',
    host: {
        class: CLASS_NAME.cardAnalyticsScaleText
    }
})
export class CardKpiScaleTextDirective implements HasElementRef {
    /** @hidden */
    readonly elementRef = inject(ElementRef);
}
