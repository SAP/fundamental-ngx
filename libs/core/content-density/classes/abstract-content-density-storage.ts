import { Signal } from '@angular/core';
import { ContentDensityMode } from '../types/content-density.mode';

/**
 * Abstract class for content density storage implementations.
 * The default implementation is MemoryContentDensityStorage.
 *
 * Provides a signal-based API for reactive content density tracking.
 *
 * @example
 * // Provide a custom storage implementation
 * providers: [
 *   { provide: ContentDensityStorage, useClass: LocalContentDensityStorage }
 * ]
 */
export abstract class ContentDensityStorage {
    /**
     * Current content density as a readonly signal.
     * Read this signal to get the current density or react to changes.
     */
    abstract readonly contentDensity: Signal<ContentDensityMode>;

    /**
     * Updates the content density.
     * @param density The new content density mode
     */
    abstract setContentDensity(density: ContentDensityMode): void;
}
