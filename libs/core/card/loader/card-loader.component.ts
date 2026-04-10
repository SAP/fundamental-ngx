import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fd-card-loader',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-card__loader'
    }
})
export class CardLoaderComponent implements HasElementRef {
    /** @hidden */
    readonly elementRef = inject(ElementRef);
}
