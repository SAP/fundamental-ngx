import { ElementRef, Optional, Provider, Self, SkipSelf } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, of, switchMap, takeUntil, tap } from 'rxjs';
import { DestroyedService } from '@fundamental-ngx/core/utils';
import { ContentDensityControllerService } from '../services/content-density-controller.service';
import { ContentDensityDirective } from '../directives/content-density.directive';
import { ContentDensityMode } from '../content-density.types';

export abstract class ContentDensityConsumer extends Observable<ContentDensityMode> {
    abstract isCompact$: Observable<boolean>;
    abstract isCozy$: Observable<boolean>;
    abstract isCondensed$: Observable<boolean>;
}

const defaultContentDensityConsumerConfigs = {
    modifiers: {},
    supportedContentDensity: [ContentDensityMode.COMPACT, ContentDensityMode.COZY, ContentDensityMode.CONDENSED],
    defaultContentDensity: ContentDensityMode.COZY,
    applyMode: true
};

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
            parentContentDensityDirective?: ContentDensityDirective,
            contentDensityDirective?: ContentDensityDirective,
            contentDensityService?: ContentDensityControllerService
        ) => {
            const contentDensity$ = new BehaviorSubject(configuration.defaultContentDensity);
            let changesSource$: Observable<string> = of(configuration.defaultContentDensity);
            if (contentDensityDirective) {
                changesSource$ = contentDensityDirective.pipe(
                    switchMap((density) => {
                        if (density === ContentDensityMode.GLOBAL) {
                            return contentDensityService
                                ? contentDensityService.contentDensityListener()
                                : of(configuration.defaultContentDensity);
                        }
                        return of(density);
                    })
                );
            } else if (parentContentDensityDirective) {
                changesSource$ = parentContentDensityDirective.pipe(
                    switchMap((density) => {
                        if (density === ContentDensityMode.GLOBAL) {
                            return contentDensityService
                                ? contentDensityService.contentDensityListener()
                                : of(configuration.defaultContentDensity);
                        }
                        return of(density);
                    })
                );
            } else if (contentDensityService) {
                changesSource$ = contentDensityService.contentDensityListener();
            }

            changesSource$
                .pipe(
                    distinctUntilChanged(),
                    map((density) => {
                        if (
                            density === ContentDensityMode.CONDENSED &&
                            configuration.supportedContentDensity.indexOf(density) === -1
                        ) {
                            return ContentDensityMode.COMPACT;
                        }

                        return density;
                    }),
                    takeUntil(destroy$)
                )
                .subscribe((density) => {
                    contentDensity$.next(density as unknown as ContentDensityMode);
                });

            if (configuration.applyMode) {
                contentDensity$
                    .pipe(
                        distinctUntilChanged(),
                        tap((density) => {
                            Object.values(configuration.modifiers).forEach((className) => {
                                elementRef.nativeElement.classList.remove(className);
                            });
                            if (configuration.modifiers[density]) {
                                elementRef.nativeElement.classList.add(configuration.modifiers[density]);
                            }
                        }),
                        takeUntil(destroy$)
                    )
                    .subscribe();
            }
            const consumer = new Observable((subscriber) => {
                const subscription = contentDensity$.subscribe((density) => {
                    subscriber.next(density);
                });
                return () => {
                    subscription.unsubscribe();
                    contentDensity$.complete();
                };
            });
            consumer['isCompact$'] = contentDensity$.pipe(map((density) => density === ContentDensityMode.COMPACT));
            consumer['isCozy$'] = contentDensity$.pipe(map((density) => density === ContentDensityMode.COZY));
            consumer['isCondensed$'] = contentDensity$.pipe(map((density) => density === ContentDensityMode.CONDENSED));
            return consumer;
        },
        deps: [
            ElementRef,
            DestroyedService,
            [new Optional(), new SkipSelf(), ContentDensityDirective],
            [new Optional(), new Self(), ContentDensityDirective],
            [new Optional(), ContentDensityControllerService]
        ]
    };
}
