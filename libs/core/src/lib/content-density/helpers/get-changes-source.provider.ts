import { map, Observable, of, switchMap } from 'rxjs';
import { ContentDensityControllerService } from '../services/content-density-controller.service';
import {
    ContentDensityDefaultKeyword,
    ContentDensityGlobalKeyword,
    ContentDensityMode,
    LocalContentDensityMode
} from '../content-density.types';

export const getChangesSource$ = (params: {
    defaultContentDensity: ContentDensityMode;
    contentDensityDirective?: Observable<LocalContentDensityMode>;
    contentDensityService?: ContentDensityControllerService;
}): Observable<ContentDensityMode> => {
    const serviceValue$: Observable<ContentDensityMode> = params.contentDensityService
        ? params.contentDensityService
              .contentDensityListener()
              .pipe(
                  map((density) => (density === ContentDensityDefaultKeyword ? params.defaultContentDensity : density))
              )
        : of(params.defaultContentDensity);
    let changesSource$: Observable<LocalContentDensityMode> = of(params.defaultContentDensity);
    if (params.contentDensityDirective) {
        changesSource$ = params.contentDensityDirective;
    } else if (params.contentDensityService) {
        changesSource$ = serviceValue$;
    }
    return changesSource$.pipe(
        switchMap((mode: LocalContentDensityMode) => {
            if (mode !== ContentDensityGlobalKeyword) {
                return of(mode);
            }
            return serviceValue$;
        })
    );
};
