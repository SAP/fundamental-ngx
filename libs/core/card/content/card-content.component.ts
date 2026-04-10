import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fd-card-content',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-card__content'
    }
})
export class CardContentComponent implements HasElementRef {
    /** @hidden */
    readonly elementRef = inject(ElementRef);
}
