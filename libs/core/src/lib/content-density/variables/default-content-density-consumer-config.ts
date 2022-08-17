import { ContentDensityMode } from '../content-density.types';
import { ContentDensityObserverSettings } from '../classes/content-density-observer.settings';

export const defaultContentDensityObserverConfigs: Required<ContentDensityObserverSettings> = {
    modifiers: {},
    supportedContentDensity: [ContentDensityMode.COMPACT, ContentDensityMode.COZY],
    defaultContentDensity: ContentDensityMode.COZY,
    debug: false
};
