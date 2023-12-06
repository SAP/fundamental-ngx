import { coerceElement } from '@angular/cdk/coercion';
import { ContentDensityObserverSettings } from '../classes/content-density-observer.settings';
import { ContentDensityCallbackFn, ContentDensityObserverTarget } from '../content-density.types';
import { ContentDensityMode } from '../types/content-density.mode';
import { defaultContentDensityObserverConfigs } from '../variables/default-content-density-consumer-config';

/** Content density callback factory */
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
                ...(consumerConfig.contentDensitySettings || {})
            },
            elementRef: consumerConfig.elementRef
        };
        const settings: Required<ContentDensityObserverSettings> = configs.contentDensitySettings;
        const element = coerceElement(configs.elementRef);

        Object.values(settings.modifiers).forEach((className) => {
            element.classList.remove(className);
        });

        const modifier = settings.modifiers[contentDensityMode];

        if (modifier) {
            element.classList.add(modifier);
        }
    };
}
