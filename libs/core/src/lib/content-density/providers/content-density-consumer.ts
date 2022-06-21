import { ChangeDetectorRef, ElementRef, Optional, Provider } from '@angular/core';
import { distinctUntilChanged, map, Observable, takeUntil, tap } from 'rxjs';
import { DestroyedService } from '@fundamental-ngx/core/utils';
import { GlobalContentDensityService } from '../services/global-content-density.service';
import { ContentDensityMode, LocalContentDensityMode } from '../content-density.types';
import { CONTENT_DENSITY_DIRECTIVE } from '../tokens/content-density-directive';
import { ContentDensityConsumer } from '../classes/content-density-consumer.class';
import { defaultContentDensityConsumerConfigs } from '../variables/default-content-density-consumer-config';
import { getChangesSource$ } from '../helpers/get-changes-source.provider';

export function contentDensityConsumer(providedConfiguration: {
    modifiers?: Partial<Record<ContentDensityMode, string>>;
    supportedContentDensity?: ContentDensityMode[];
    defaultContentDensity?: ContentDensityMode;
    applyMode?: boolean;
}): Provider {
    const configuration = { ...defaultContentDensityConsumerConfigs, ...providedConfiguration };
    const isSupported = (density: ContentDensityMode): boolean =>
        configuration.supportedContentDensity.includes(density);

    const alternativeTo = {
        [ContentDensityMode.COMPACT]: (): ContentDensityMode =>
            isSupported(ContentDensityMode.CONDENSED) ? ContentDensityMode.CONDENSED : ContentDensityMode.COZY,
        [ContentDensityMode.CONDENSED]: (): ContentDensityMode =>
            isSupported(ContentDensityMode.COMPACT) ? ContentDensityMode.COMPACT : ContentDensityMode.COZY,
        [ContentDensityMode.COZY]: (): ContentDensityMode => ContentDensityMode.COZY // No alternative here, everyone should support it
    };

    return {
        provide: ContentDensityConsumer,
        useFactory: (
            elementRef: ElementRef<Element>,
            destroy$: Observable<void>,
            changeDetectorRef: ChangeDetectorRef,
            contentDensityDirective?: Observable<LocalContentDensityMode>,
            contentDensityService?: GlobalContentDensityService
        ) => {
            const changesSource$: Observable<ContentDensityMode> = getChangesSource$({
                defaultContentDensity: configuration.defaultContentDensity,
                contentDensityDirective,
                contentDensityService
            }).pipe(
                map((density: ContentDensityMode) => {
                    if (!isSupported(density)) {
                        return alternativeTo[density]();
                    }

                    return density;
                }),
                distinctUntilChanged(),
                tap((density) => {
                    if (configuration.applyMode) {
                        Object.values(configuration.modifiers).forEach((className) => {
                            elementRef.nativeElement.classList.remove(className);
                        });
                        if (configuration.modifiers[density]) {
                            elementRef.nativeElement.classList.add(configuration.modifiers[density]);
                        }
                    }
                })
            );

            changesSource$.pipe(takeUntil(destroy$)).subscribe();

            return new ContentDensityConsumer(changesSource$, destroy$, changeDetectorRef);
        },
        deps: [
            ElementRef,
            DestroyedService,
            ChangeDetectorRef,
            [new Optional(), CONTENT_DENSITY_DIRECTIVE],
            [new Optional(), GlobalContentDensityService]
        ]
    };
}

export function contentDensityConsumerProviders(params?: {
    modifiers?: Partial<Record<ContentDensityMode, string>>;
    supportedContentDensity?: ContentDensityMode[];
    defaultContentDensity?: ContentDensityMode;
    applyMode?: boolean;
}): Provider[] {
    const providedConfiguration = params || {};
    return [DestroyedService, contentDensityConsumer(providedConfiguration)];
}
