import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { FD_CARD_KPI_HEADER } from '../token';

@Component({
    selector: 'fd-card-kpi-header',
    templateUrl: './card-kpi-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-card__analytics-area'
    },
    providers: [
        {
            provide: FD_CARD_KPI_HEADER,
            useExisting: CardKpiHeaderComponent
        }
    ]
})
export class CardKpiHeaderComponent implements HasElementRef {
    /** @hidden */
    readonly elementRef = inject(ElementRef);
}
