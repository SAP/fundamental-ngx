import { Component } from '@angular/core';
import { SkeletonConsumerDirective, skeletonConsumerProviders } from '@fundamental-ngx/core/skeleton';

@Component({
    selector: 'fd-skeleton-consumer-example',
    template: `<button>Custom button component</button>`,
    providers: skeletonConsumerProviders()
})
export class SkeletonConsumerExampleComponent {
    constructor(private readonly _skeletonConsumer: SkeletonConsumerDirective) {
        // It's required to consume state to react to skeleton state changes
        _skeletonConsumer.consume();
    }
}
