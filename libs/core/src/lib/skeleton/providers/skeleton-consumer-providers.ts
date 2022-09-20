import { Provider } from '@angular/core';

import { consumerProviderFactory, DestroyedService } from '@fundamental-ngx/core/utils';

import { SkeletonObserverConfig } from '../skeleton.types';
import { SkeletonConsumerDirective } from '../directives/skeleton-consumer.directive';

/**
 * Creates provider for ContentDensityObserver and adds DestroyedService provider
 */
export function skeletonConsumerProviders(config?: SkeletonObserverConfig): Provider[] {
    return [DestroyedService, consumerProviderFactory(SkeletonConsumerDirective, config)];
}
