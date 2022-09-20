import { Directive } from '@angular/core';
import {
    ContentDensityObserver,
    contentDensityObserverProviders,
    ContentDensityMode
} from '@fundamental-ngx/core/content-density';
import { skeletonConsumerProviders, SkeletonConsumerDirective } from '@fundamental-ngx/core/skeleton';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'input[fd-form-control]',
    providers: [
        contentDensityObserverProviders({
            modifiers: {
                [ContentDensityMode.COMPACT]: 'fd-input--compact'
            }
        }),
        skeletonConsumerProviders({ native: true })
    ],
    host: {
        class: 'fd-input'
    }
})
export class InputFormControlDirective {
    /** @hidden */
    constructor(
        private _contentDensityObserver: ContentDensityObserver,
        private readonly _skeletonConsumer: SkeletonConsumerDirective
    ) {
        this._contentDensityObserver.subscribe();
        this._skeletonConsumer.consume();
    }
}
