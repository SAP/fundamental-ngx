import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { CLASS_NAME } from '../constants';

@Component({
    selector: 'fd-card-loader',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: CLASS_NAME.cardLoader
    }
})
export class CardLoaderComponent implements HasElementRef {
    /** @hidden */
    readonly elementRef = inject(ElementRef);
}
