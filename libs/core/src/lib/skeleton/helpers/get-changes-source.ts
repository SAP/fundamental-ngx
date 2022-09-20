import { Observable, of, switchMap } from 'rxjs';

import { Nullable } from '@fundamental-ngx/core/shared';

import { SkeletonGlobalService } from '../services/skeleton-global.service';
import { SkeletonStateGlobalKeyword, LocalSkeletonState } from '../skeleton.types';

export const getChangesSource$ = (
    skeletonDirective?: Nullable<Observable<LocalSkeletonState>>,
    skeletonGlobalService?: Nullable<SkeletonGlobalService>
): Observable<boolean> => {
    const serviceValue$ = skeletonGlobalService ? skeletonGlobalService.skeletonStateObservable : of(false);
    const changesSource$ = skeletonDirective ? skeletonDirective : serviceValue$;

    return changesSource$.pipe(
        switchMap((mode: LocalSkeletonState) => {
            if (mode !== SkeletonStateGlobalKeyword) {
                return of(mode);
            }

            return serviceValue$;
        })
    );
};
