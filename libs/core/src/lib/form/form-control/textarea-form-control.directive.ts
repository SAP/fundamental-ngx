import { Directive } from '@angular/core';
import {
    ContentDensityObserver,
    contentDensityObserverProviders,
    ContentDensityMode
} from '@fundamental-ngx/core/content-density';
import { SkeletonConsumerDirective, skeletonConsumerProviders } from '@fundamental-ngx/core/skeleton';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'textarea[fd-form-control]',
    providers: [
        contentDensityObserverProviders({
            modifiers: {
                [ContentDensityMode.COMPACT]: 'fd-textarea--compact'
            }
        }),
        skeletonConsumerProviders({ width: '10rem', height: '2.25rem' })
    ],
    host: {
        class: 'fd-textarea'
    }
})
export class TextareaFormControlDirective {
    /** @hidden */
    constructor(
        private _contentDensityObserver: ContentDensityObserver,
        private _skeletonConsumer: SkeletonConsumerDirective
    ) {
        this._contentDensityObserver.subscribe();
        this._skeletonConsumer.consume();
    }
}
