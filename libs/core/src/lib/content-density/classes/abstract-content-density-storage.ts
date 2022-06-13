import { GlobalContentDensityMode } from '../content-density.types';
import { Observable } from 'rxjs';

export abstract class ContentDensityStorage {
    abstract getContentDensity(): Observable<GlobalContentDensityMode>;

    abstract setContentDensity(density: GlobalContentDensityMode): Observable<void>;
}
