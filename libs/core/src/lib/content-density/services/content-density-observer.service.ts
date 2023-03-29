import { ElementRef, FactorySansProvider, inject, Injectable, InjectFlags, Injector, Renderer2 } from '@angular/core';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';
import { BehaviorSubject, distinctUntilChanged, map, takeUntil } from 'rxjs';
import { ContentDensityObserverSettings } from '../classes/content-density-observer.settings';
import { ContentDensityObserverTarget } from '../content-density.types';
import { getChangesSource$ } from '../helpers/get-changes-source.provider';
import { GlobalContentDensityService } from '../services/global-content-density.service';
import { CONTENT_DENSITY_DIRECTIVE } from '../tokens/content-density-directive';
import { ContentDensityMode } from '../types/content-density.mode';
import { defaultContentDensityObserverConfigs } from '../variables/default-content-density-consumer-config';

const isFactoryProvider = (obj: any): obj is FactorySansProvider => !!(obj && (obj as FactorySansProvider).useFactory);

const getDeps = (injector: Injector, defaultContentDensity: FactorySansProvider): Array<any> =>
    (defaultContentDensity.deps || []).map((dep): any => {
        if (Array.isArray(dep)) {
            let type;
            let flags = InjectFlags.Default;
            for (let index = 0; index < dep.length; index++) {
                const flag = dep[index]['__NG_DI_FLAG__'];
                if (typeof flag === 'number') {
                    // eslint-disable-next-line no-bitwise
                    flags |= flag;
                } else {
                    type = dep[index];
                }
            }
            return injector.get(type, undefined, flags);
        }
        return injector.get(dep, undefined, InjectFlags.Default);
    });

const getDefaultContentDensity = (
    injector: Injector,
    configuration: Required<ContentDensityObserverSettings>
): ContentDensityMode => {
    if (typeof configuration.defaultContentDensity === 'string') {
        return configuration.defaultContentDensity as ContentDensityMode;
    }
    if (isFactoryProvider(configuration.defaultContentDensity)) {
        const deps = getDeps(injector, configuration.defaultContentDensity);
        return configuration.defaultContentDensity.useFactory(...deps);
    }
    return injector.get(configuration.defaultContentDensity, undefined, undefined);
};

const initialContentDensity = (
    injector: Injector,
    configuration?: ContentDensityObserverSettings
): ContentDensityMode => {
    const serviceValue = injector.get(GlobalContentDensityService, null, InjectFlags.Optional)?.currentContentDensity;
    if (serviceValue) {
        return serviceValue;
    }
    return getDefaultContentDensity(injector, {
        ...defaultContentDensityObserverConfigs,
        ...(configuration || {})
    });
};

@Injectable()
export class ContentDensityObserver extends BehaviorSubject<ContentDensityMode> {
    /** @hidden */
    private readonly _isCompact$ = new BehaviorSubject<boolean>(false);
    /** @hidden */
    private readonly _isCozy$ = new BehaviorSubject<boolean>(false);
    /** @hidden */
    private readonly _isCondensed$ = new BehaviorSubject<boolean>(false);
    /** @hidden */
    readonly config: ContentDensityObserverSettings;
    /** @hidden */
    readonly isCompact$ = this._isCompact$.asObservable();
    /** @hidden */
    readonly isCozy$ = this._isCozy$.asObservable();
    /** @hidden */
    readonly isCondensed$ = this._isCondensed$.asObservable();
    /** @hidden */
    get isCompact(): boolean {
        return this._isCompact$.value;
    }
    /** @hidden */
    get isCozy(): boolean {
        return this._isCozy$.value;
    }
    /** @hidden */
    get isCondensed(): boolean {
        return this._isCondensed$.value;
    }

    /** @hidden */
    private _globalContentDensityService = inject(GlobalContentDensityService, {
        optional: true
    });

    /** @hidden */
    private _contentDensityDirective = inject(CONTENT_DENSITY_DIRECTIVE, {
        optional: true
    });

    /** @hidden */
    private _parentContentDensityObserver = inject(ContentDensityObserver, {
        optional: true,
        skipSelf: true
    });

    /** @hidden */
    private _renderer: Renderer2 | null = inject(Renderer2);

    /** @hidden */
    private readonly _destroy$ = inject(DestroyedService);

    /** @hidden */
    private _elementRef: ElementRef<any> | null = inject(ElementRef);

    /** @hidden */
    private _elements = [this._elementRef];

    /** @hidden */
    private _alternativeTo = {
        [ContentDensityMode.COMPACT]: (): ContentDensityMode =>
            this._isSupported(ContentDensityMode.CONDENSED) ? ContentDensityMode.CONDENSED : ContentDensityMode.COZY,
        [ContentDensityMode.CONDENSED]: (): ContentDensityMode =>
            this._isSupported(ContentDensityMode.COMPACT) ? ContentDensityMode.COMPACT : ContentDensityMode.COZY,
        [ContentDensityMode.COZY]: (): ContentDensityMode => ContentDensityMode.COZY // No alternative here, everyone should support it
    };

    /** @hidden */
    constructor(private _injector: Injector, private _providedConfig?: ContentDensityObserverSettings) {
        super(initialContentDensity(_injector, _providedConfig));

        const destroySub = this._destroy$.subscribe({
            complete: () => {
                destroySub.unsubscribe();
                this.complete();
                if (this.config.debug) {
                    console.log('ContentDensityObserver: destroyed');
                }
            }
        });

        this.config = {
            ...defaultContentDensityObserverConfigs,
            ...(_providedConfig || {})
        };

        getChangesSource$({
            defaultContentDensity: this.value,
            contentDensityDirective: this._contentDensityDirective ?? undefined,
            contentDensityService: this._globalContentDensityService ?? undefined
        })
            .pipe(
                map((density) => {
                    if (this.config.debug) {
                        console.log(`ContentDensityObserver: density changed to ${density}`);
                    }
                    if (!this._isSupported(density)) {
                        try {
                            if (this.config.debug) {
                                console.log(
                                    `ContentDensityObserver: ${density} is not supported. Failing back to alternative one.`
                                );
                            }
                            return this._alternativeTo[density]();
                        } catch (e) {
                            throw new Error(`ContentDensityObserver: density ${density} is not supported`);
                        }
                    }
                    return density;
                }),
                distinctUntilChanged(),
                takeUntil(this._destroy$)
            )
            .subscribe((density) => {
                this.next(density);
                this._applyClass();
                this._isCompact$.next(density === ContentDensityMode.COMPACT);
                this._isCozy$.next(density === ContentDensityMode.COZY);
                this._isCondensed$.next(density === ContentDensityMode.CONDENSED);
            });
    }

    /** @hidden */
    consume(...consumers: ContentDensityObserverTarget[]): void {
        this._elements.concat(...consumers.map((c) => c.elementRef()));
    }

    /**
     * Completes the stream and closes all internal subscriptions.
     */
    override complete(): void {
        super.complete();
        this._isCondensed$.complete();
        this._isCozy$.complete();
        this._isCompact$.complete();
        this._parentContentDensityObserver = null;
        this._contentDensityDirective = null;
        this._globalContentDensityService = null;
        this._elementRef = null;
        this._renderer = null;
        this._elements = [];
    }

    /** @hidden */
    removeConsumer(consumer: ContentDensityObserverTarget): void {
        this._elements.splice(this._elements.indexOf(consumer.elementRef()), 1);
    }

    /** @hidden */
    private _applyClass(): void {
        if (!this.config?.modifiers) {
            return;
        }
        const modifiers = this.config.modifiers;

        const parentContentDensityEqual = this._parentContentDensityObserver?.value === this.value;

        this._elements.forEach((element) => {
            Object.values(modifiers).forEach((className) => {
                this._renderer?.removeClass(element?.nativeElement, className);
            });

            // Simply remove all modifiers from current element. Content density state is covered by parent element.
            if (parentContentDensityEqual && !this.config.alwaysAddModifiers) {
                return;
            }

            this._renderer?.addClass(element?.nativeElement, modifiers[this.value]!);
        });
    }

    /** Check if the given density is supported */
    private _isSupported(density: ContentDensityMode): boolean {
        return this.config.supportedContentDensity?.includes(density) ?? false;
    }
}
