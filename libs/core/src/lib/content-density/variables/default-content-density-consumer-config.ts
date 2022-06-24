import { ContentDensityConsumerSettings, ContentDensityMode } from '../content-density.types';

export const defaultContentDensityConsumerConfigs: Required<ContentDensityConsumerSettings> = {
    modifiers: {},
    supportedContentDensity: [ContentDensityMode.COMPACT, ContentDensityMode.COZY],
    defaultContentDensity: ContentDensityMode.COZY
};
