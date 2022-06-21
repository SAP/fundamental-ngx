import { Observable, of, switchMap } from 'rxjs';
import { GlobalContentDensityService } from '../services/global-content-density.service';
import { ContentDensityGlobalKeyword, ContentDensityMode, LocalContentDensityMode } from '../content-density.types';

export const getChangesSource$ = (params: {
    defaultContentDensity: ContentDensityMode;
    contentDensityDirective?: Observable<LocalContentDensityMode>;
    contentDensityService?: GlobalContentDensityService;
}): Observable<ContentDensityMode> => {
    const serviceValue$: Observable<ContentDensityMode> = params.contentDensityService
        ? params.contentDensityService.contentDensityListener()
        : of(params.defaultContentDensity);
    const changesSource$ = params.contentDensityDirective ? params.contentDensityDirective : serviceValue$;

    return changesSource$.pipe(
        switchMap((mode: LocalContentDensityMode) => {
            if (mode !== ContentDensityGlobalKeyword) {
                return of(mode);
            }
            return serviceValue$;
        })
    );
};
