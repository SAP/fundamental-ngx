import { Provider } from '@angular/core';
import { ContentDensityGlobalKeyword, LocalContentDensityMode } from '../content-density.types';
import { BehaviorSubject } from 'rxjs';
import { CONTENT_DENSITY_DIRECTIVE } from '../tokens/content-density-directive';

/** @hidden */
export function mockedLocalContentDensityDirective(
    defaultValue: LocalContentDensityMode = ContentDensityGlobalKeyword
): { contentDensityDirectiveProvider: Provider; setContentDensity: (cd: LocalContentDensityMode) => void } {
    const behaviorSubject = new BehaviorSubject(defaultValue);
    return {
        contentDensityDirectiveProvider: {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useValue: behaviorSubject.asObservable()
        },
        setContentDensity: (cd: LocalContentDensityMode) => behaviorSubject.next(cd)
    };
}
