import { Observable, of, switchMap } from 'rxjs';
import { GlobalContentDensityService } from '../services/global-content-density.service';
import {
    ContentDensityDefaultKeyword,
    ContentDensityGlobalKeyword,
    LocalContentDensityMode
} from '../content-density.types';
import { ContentDensityMode } from '../types/content-density.mode';

export const getChangesSource$ = (params: {
    defaultContentDensity: ContentDensityMode;
    contentDensityDirective?: Observable<LocalContentDensityMode>;
    contentDensityService?: GlobalContentDensityService;
    parentContentDensityService?: Observable<ContentDensityMode>;
}): Observable<ContentDensityMode> => {
    const serviceValue$: Observable<ContentDensityMode> = params.contentDensityService
        ? params.contentDensityService.contentDensityListener()
        : of(params.defaultContentDensity);
    const changesSource$ = params.parentContentDensityService
        ? params.parentContentDensityService
        : params.contentDensityDirective
        ? params.contentDensityDirective
        : serviceValue$;

    return changesSource$.pipe(
        switchMap((mode: LocalContentDensityMode) => {
            if (mode === ContentDensityDefaultKeyword) {
                return of(params.defaultContentDensity);
            }
            if (mode === ContentDensityGlobalKeyword) {
                return serviceValue$;
            }
            return of(mode);
        })
    );
};
