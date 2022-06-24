import { ContentDensityObserverSettings, ContentDensityMode } from '../content-density.types';

export const defaultContentDensityObserverConfigs: Required<ContentDensityObserverSettings> = {
    modifiers: {},
    supportedContentDensity: [ContentDensityMode.COMPACT, ContentDensityMode.COZY],
    defaultContentDensity: ContentDensityMode.COZY
};
