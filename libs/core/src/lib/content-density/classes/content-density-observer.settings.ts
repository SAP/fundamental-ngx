import { ContentDensityMode } from '../content-density.types';

export class ContentDensityObserverSettings {
    modifiers?: Partial<Record<ContentDensityMode, string>>;
    supportedContentDensity?: ContentDensityMode[];
    defaultContentDensity?: ContentDensityMode;
}
