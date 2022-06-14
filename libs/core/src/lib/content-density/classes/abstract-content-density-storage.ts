import { ContentDensityMode } from '../content-density.types';
import { Observable } from 'rxjs';

export abstract class ContentDensityStorage {
    abstract getContentDensity(): Observable<ContentDensityMode>;

    abstract setContentDensity(density: ContentDensityMode): Observable<void>;
}
