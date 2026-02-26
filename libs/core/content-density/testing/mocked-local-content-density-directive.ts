import { Provider, signal } from '@angular/core';
import { ContentDensityGlobalKeyword, LocalContentDensityMode } from '../content-density.types';
import { CONTENT_DENSITY_DIRECTIVE, ContentDensityDirectiveRef } from '../tokens/content-density-directive';

/** @hidden */
export function mockedLocalContentDensityDirective(
    defaultValue: LocalContentDensityMode = ContentDensityGlobalKeyword
): { contentDensityDirectiveProvider: Provider; setContentDensity: (cd: LocalContentDensityMode) => void } {
    const densitySignal = signal<LocalContentDensityMode>(defaultValue);

    const mockDirective: ContentDensityDirectiveRef = {
        densityMode: densitySignal.asReadonly(),
        get value(): LocalContentDensityMode {
            return densitySignal();
        }
    };

    return {
        contentDensityDirectiveProvider: {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useValue: mockDirective
        },
        setContentDensity: (cd: LocalContentDensityMode) => densitySignal.set(cd)
    };
}
