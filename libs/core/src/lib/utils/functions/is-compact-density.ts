import { ContentDensity } from './../services/content-density.service';

/**
 * Determines if "compact" styles should be applied based on provided content density
 */
export function isCompactDensity(size: ContentDensity): boolean {
    return size !== 'cozy';
}
