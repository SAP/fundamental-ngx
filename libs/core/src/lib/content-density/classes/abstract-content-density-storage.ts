import { ContentDensityMode } from '../content-density.types';
import { Observable } from 'rxjs';

/**
 * Abstract provider class for providing content density storage functionality
 * Default implementation is MemoryContentDensityStorage
 */
export abstract class ContentDensityStorage {
    /**
     * Get listener for current density updates
     */
    abstract getContentDensity(): Observable<ContentDensityMode>;

    /**
     * Save updated configuration
     * @param density
     */
    abstract setContentDensity(density: ContentDensityMode): Observable<void>;
}
