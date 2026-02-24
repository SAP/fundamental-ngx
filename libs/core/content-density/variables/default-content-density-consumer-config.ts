import { ContentDensityObserverSettings } from '../classes/content-density-observer.settings';
import { ContentDensityMode } from '../types/content-density.mode';

export const defaultContentDensityObserverConfigs: Required<ContentDensityObserverSettings> = {
    modifiers: {
        [ContentDensityMode.COMPACT]: 'is-compact',
        [ContentDensityMode.COZY]: 'is-cozy',
        [ContentDensityMode.CONDENSED]: 'is-condensed'
    },
    supportedContentDensity: [ContentDensityMode.COMPACT, ContentDensityMode.COZY],
    defaultContentDensity: ContentDensityMode.COZY,
    debug: false,
    alwaysAddModifiers: false,
    restrictChildContentDensity: false,
    ui5Markers: {
        enabled: true
    }
};
