import { ContentDensityMode } from '../types/content-density.mode';
import { ContentDensityObserverSettings } from '../classes/content-density-observer.settings';

export const defaultContentDensityObserverConfigs: Required<ContentDensityObserverSettings> = {
    modifiers: {},
    supportedContentDensity: [ContentDensityMode.COMPACT, ContentDensityMode.COZY],
    defaultContentDensity: ContentDensityMode.COZY,
    debug: false
};
