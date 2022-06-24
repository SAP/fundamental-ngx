import { ChangeDetectorRef, ElementRef, Optional, Provider } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DestroyedService } from '@fundamental-ngx/core/utils';
import { GlobalContentDensityService } from '../services/global-content-density.service';
import { ContentDensityConsumerSettings, ContentDensityMode, LocalContentDensityMode } from '../content-density.types';
import { CONTENT_DENSITY_DIRECTIVE } from '../tokens/content-density-directive';
import { ContentDensityObserver } from '../classes/content-density-consumer.class';
import { defaultContentDensityConsumerConfigs } from '../variables/default-content-density-consumer-config';
import { getChangesSource$ } from '../helpers/get-changes-source.provider';

/**
 * Creates provider for ContentDensityObserver
 * @param providedConfiguration
 */
export function contentDensityObserver(providedConfiguration?: ContentDensityConsumerSettings): Provider {
    const configuration: Required<ContentDensityConsumerSettings> = {
        ...defaultContentDensityConsumerConfigs,
        ...(providedConfiguration || {})
    };

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
        provide: ContentDensityObserver,
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
                })
            );
            const observer = new ContentDensityObserver(
                contentDensityService?.currentContentDensity || configuration.defaultContentDensity,
                changesSource$,
                destroy$,
                changeDetectorRef
            );
            if (providedConfiguration) {
                observer.consume({
                    contentDensitySettings: { ...configuration },
                    elementRef: () => elementRef
                });
            }
            return observer;
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

/**
 * Creates provider for ContentDensityObserver and adds DestroyedService provider
 */
export function contentDensityObserverProviders(params?: ContentDensityConsumerSettings): Provider[] {
    const providedConfiguration = params || {};
    return [DestroyedService, contentDensityObserver(providedConfiguration)];
}
