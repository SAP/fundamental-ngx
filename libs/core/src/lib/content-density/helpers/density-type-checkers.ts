import { ContentDensityMode } from '../content-density.types';

export const isCompact = (density: ContentDensityMode): boolean => density === ContentDensityMode.COMPACT;
export const isCondensed = (density: ContentDensityMode): boolean => density === ContentDensityMode.CONDENSED;
export const isCozy = (density: ContentDensityMode): boolean => density === ContentDensityMode.COZY;
