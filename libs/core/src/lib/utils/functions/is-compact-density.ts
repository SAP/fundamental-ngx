import { ContentDensity } from '../interfaces/content-density';

/** Determines whether provided value is valid content density */
export function isValidContentDensity(size: any): size is ContentDensity {
    return size === 'cozy' || size === 'compact' || size === 'condensed';
}

/**
 * Determines if "compact" styles should be applied based on provided content density
 */
export function isCompactDensity(size: ContentDensity): boolean {
    return isValidContentDensity(size) && size !== 'cozy';
}
