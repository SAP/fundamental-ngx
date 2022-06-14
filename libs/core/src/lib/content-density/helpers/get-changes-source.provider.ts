import { Observable, of, switchMap } from 'rxjs';
import { ContentDensityControllerService } from '../services/content-density-controller.service';
import { ContentDensityGlobalKeyword, ContentDensityMode, LocalContentDensityMode } from '../content-density.types';

export const getChangesSource$ = (params: {
    defaultContentDensity: ContentDensityMode;
    contentDensityDirective?: Observable<LocalContentDensityMode>;
    contentDensityService?: ContentDensityControllerService;
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
