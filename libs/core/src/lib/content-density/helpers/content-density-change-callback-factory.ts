import { coerceElement } from '@angular/cdk/coercion';
import { ContentDensityCallbackFn, ContentDensityObserverTarget } from '../content-density.types';
import { defaultContentDensityObserverConfigs } from '../variables/default-content-density-consumer-config';
import { ContentDensityObserverSettings } from '../classes/content-density-observer.settings';
import { ContentDensityMode } from '../types/content-density.mode';

export function contentDensityCallbackFactory(
    consumerConfig: ContentDensityObserverTarget | ContentDensityCallbackFn
): ContentDensityCallbackFn {
    if (typeof consumerConfig === 'function') {
        return consumerConfig;
    }
    return (contentDensityMode: ContentDensityMode) => {
        const configs = {
            contentDensitySettings: {
                ...defaultContentDensityObserverConfigs,
                ...consumerConfig.contentDensitySettings
            },
            elementRef: () => consumerConfig.elementRef()
        };
        const settings: Required<ContentDensityObserverSettings> = configs.contentDensitySettings;
        const element = coerceElement(configs.elementRef());

        Object.values(settings.modifiers).forEach((className) => {
            element.classList.remove(className);
        });
        if (settings.modifiers[contentDensityMode]) {
            element.classList.add(settings.modifiers[contentDensityMode]);
        }
    };
}
