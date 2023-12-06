import { Provider } from '@angular/core';
import { consumerProviderFactory } from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserverSettings } from '../classes/content-density-observer.settings';
import { ContentDensityObserver } from '../services/content-density-observer.service';

/**
 * Creates provider for ContentDensityObserver
 */
export function contentDensityObserverProviders(params?: ContentDensityObserverSettings): Provider[] {
    return [consumerProviderFactory(ContentDensityObserver, params)];
}
