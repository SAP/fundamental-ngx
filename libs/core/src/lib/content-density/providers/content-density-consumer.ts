import { ElementRef, Optional, Provider, Self, SkipSelf } from '@angular/core';
import { distinctUntilChanged, map, Observable, takeUntil, tap } from 'rxjs';
import { DestroyedService } from '@fundamental-ngx/core/utils';
import { ContentDensityControllerService } from '../services/content-density-controller.service';
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

    return {
        provide: ContentDensityConsumer,
        useFactory: (
            elementRef: ElementRef<Element>,
            destroy$: Observable<void>,
            parentContentDensityDirective?: Observable<LocalContentDensityMode>,
            contentDensityDirective?: Observable<LocalContentDensityMode>,
            contentDensityService?: ContentDensityControllerService
        ) => {
            const changesSource$: Observable<ContentDensityMode> = getChangesSource$({
                defaultContentDensity: configuration.defaultContentDensity,
                contentDensityDirective: contentDensityDirective || parentContentDensityDirective,
                contentDensityService
            }).pipe(
                map((density: ContentDensityMode) => {
                    if (
                        density === ContentDensityMode.CONDENSED &&
                        configuration.supportedContentDensity.indexOf(density) === -1
                    ) {
                        return ContentDensityMode.COMPACT;
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

            return new ContentDensityConsumer(changesSource$);
        },
        deps: [
            ElementRef,
            DestroyedService,
            [new Optional(), new SkipSelf(), CONTENT_DENSITY_DIRECTIVE],
            [new Optional(), new Self(), CONTENT_DENSITY_DIRECTIVE],
            [new Optional(), ContentDensityControllerService]
        ]
    };
}
