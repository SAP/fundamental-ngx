import { ElementRef, Optional, Provider, Self, SkipSelf } from '@angular/core';
import { ContentDensityService } from '@fundamental-ngx/core/utils';
import { BehaviorSubject, distinctUntilChanged, map, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { ContentDensityDirective } from '../directives/content-density.directive';
import { ContentDensityMode } from '../content-density.types';

export abstract class ContentDensityConsumer extends Observable<string> {}

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
            parentContentDensityDirective?: ContentDensityDirective,
            contentDensityDirective?: ContentDensityDirective,
            contentDensityService?: ContentDensityService
        ) => {
            const contentDensity$ = new BehaviorSubject(configuration.defaultContentDensity);

            return new Observable((subscriber) => {
                const subscription = new Subscription();
                let changesSource$: Observable<string> = of(configuration.defaultContentDensity);
                if (contentDensityDirective) {
                    changesSource$ = contentDensityDirective.pipe(
                        switchMap((density) => {
                            if (density === ContentDensityMode.GLOBAL) {
                                return contentDensityService
                                    ? contentDensityService._contentDensityListener
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
                                    ? contentDensityService._contentDensityListener
                                    : of(configuration.defaultContentDensity);
                            }
                            return of(density);
                        })
                    );
                } else if (contentDensityService) {
                    changesSource$ = contentDensityService._contentDensityListener;
                }

                subscription.add(
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
                            })
                        )
                        .subscribe((density) => {
                            contentDensity$.next(density as unknown as ContentDensityMode);
                        })
                );

                subscription.add(
                    contentDensity$
                        .pipe(
                            distinctUntilChanged(),
                            tap((density) => subscriber.next(density)),
                            tap((density) => {
                                if (configuration.applyMode) {
                                    Object.keys(configuration.modifiers).forEach((key) => {
                                        elementRef.nativeElement.classList.remove(configuration.modifiers[key]);
                                    });
                                    configuration.modifiers[density] &&
                                        elementRef.nativeElement.classList.add(configuration.modifiers[density]);
                                }
                            })
                        )
                        .subscribe()
                );

                return () => {
                    subscription.unsubscribe();
                    contentDensity$.complete();
                };
            });
        },
        deps: [
            ElementRef,
            [new Optional(), new SkipSelf(), ContentDensityDirective],
            [new Optional(), new Self(), ContentDensityDirective],
            [new Optional(), ContentDensityService]
        ]
    };
}
