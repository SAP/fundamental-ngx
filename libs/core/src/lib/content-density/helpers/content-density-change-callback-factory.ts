import { coerceElement } from '@angular/cdk/coercion';
import {
    ContentDensityCallbackFn,
    ContentDensityConsumerSettings,
    ContentDensityConsumerTarget,
    ContentDensityMode
} from '../content-density.types';
import { defaultContentDensityConsumerConfigs } from '../variables/default-content-density-consumer-config';

export function contentDensityCallbackFactory(
    consumerConfig: ContentDensityConsumerTarget | ContentDensityCallbackFn
): ContentDensityCallbackFn {
    if (typeof consumerConfig === 'function') {
        return consumerConfig;
    }
    return (contentDensityMode: ContentDensityMode) => {
        const configs = {
            contentDensitySettings: {
                ...defaultContentDensityConsumerConfigs,
                ...consumerConfig.contentDensitySettings
            },
            elementRef: () => consumerConfig.elementRef()
        };
        const settings: Required<ContentDensityConsumerSettings> = configs.contentDensitySettings;
        const element = coerceElement(configs.elementRef());

        Object.values(settings.modifiers).forEach((className) => {
            element.classList.remove(className);
        });
        if (settings.modifiers[contentDensityMode]) {
            element.classList.add(settings.modifiers[contentDensityMode]);
        }
    };
}
