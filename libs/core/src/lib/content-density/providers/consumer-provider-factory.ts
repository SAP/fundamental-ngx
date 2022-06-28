import { Provider } from '@angular/core';
import { consumerProviderFactory, DestroyedService } from '@fundamental-ngx/core/utils';
import { ContentDensityObserverSettings } from '../content-density.types';
import { ContentDensityObserver } from '../services/content-density-observer.service';

/**
 * Creates provider for ContentDensityObserver and adds DestroyedService provider
 */
export function contentDensityObserverProviders(params?: ContentDensityObserverSettings): Provider[] {
    return [DestroyedService, consumerProviderFactory(ContentDensityObserver, params)];
}
