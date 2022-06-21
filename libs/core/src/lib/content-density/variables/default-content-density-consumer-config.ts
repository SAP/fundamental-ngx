import { ContentDensityMode } from '../content-density.types';

export const defaultContentDensityConsumerConfigs = {
    modifiers: {},
    supportedContentDensity: [ContentDensityMode.COMPACT, ContentDensityMode.COZY],
    defaultContentDensity: ContentDensityMode.COZY,
    applyMode: true
};
