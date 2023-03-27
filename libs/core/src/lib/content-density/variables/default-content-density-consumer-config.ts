import { ContentDensityMode } from '../types/content-density.mode';
import { ContentDensityObserverSettings } from '../classes/content-density-observer.settings';

export const defaultContentDensityObserverConfigs: Required<ContentDensityObserverSettings> = {
    modifiers: {
        [ContentDensityMode.COMPACT]: 'is-compact',
        [ContentDensityMode.COZY]: 'is-cozy',
        [ContentDensityMode.CONDENSED]: 'is-condensed'
    },
    supportedContentDensity: [ContentDensityMode.COMPACT, ContentDensityMode.COZY],
    defaultContentDensity: ContentDensityMode.COZY,
    debug: false
};
