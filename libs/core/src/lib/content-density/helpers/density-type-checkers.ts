import { ContentDensityGlobalKeyword, ContentDensityMode } from '../content-density.types';

export const isCompact = (density: any): boolean => density === ContentDensityMode.COMPACT;
export const isCondensed = (density: any): boolean => density === ContentDensityMode.CONDENSED;
export const isCozy = (density: any): boolean => density === ContentDensityMode.COZY;
export const isContentDensityMode = (density: any): boolean =>
    isCompact(density) || isCondensed(density) || isCozy(density) || density === ContentDensityGlobalKeyword;
