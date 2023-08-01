import { Provider } from '@angular/core';
import { consumerProviderFactory } from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver } from '../services/content-density-observer.service';
import { ContentDensityObserverSettings } from '../classes/content-density-observer.settings';

/**
 * Creates provider for ContentDensityObserver
 */
export function contentDensityObserverProviders(params?: ContentDensityObserverSettings): Provider[] {
    return [consumerProviderFactory(ContentDensityObserver, params)];
}
