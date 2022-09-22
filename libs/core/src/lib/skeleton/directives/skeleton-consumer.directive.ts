import { Directive, ElementRef, inject, Inject, InjectionToken, Injector, Input, Optional } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';

import { DestroyedService } from '@fundamental-ngx/core/utils';
import { Nullable } from '@fundamental-ngx/core/shared';

import { SkeletonStateDirective } from '../directives/skeleton-state.directive';
import { SkeletonGlobalService } from '../services/skeleton-global.service';
import { SkeletonCallbackFn, SkeletonObserverConfig } from '../skeleton.types';
import { getChangesSource$ } from '../helpers/get-changes-source';
import { SkeletonTemplateDirective } from './skeleton-template.directive';

const DEFAULT_SKELETON_CLASS = 'fd-skeleton';
const SKELETON_ANIMATION_CLASS = 'fd-skeleton--animated';

const defaultSkeletonConfig: SkeletonObserverConfig = {
    animation: true
};

const SKELETON_CONFIG_TOKEN = new InjectionToken<SkeletonObserverConfig>('SkeletonObserverConfig');

/**
 * Directive to consume skeleton state. Shows skeleton placeholder instead of an element to which is applied.
 * Could be used at the component level using `skeletonConsumerProviders` factory function.
 */
@Directive({
    selector: '[fdSkeletonConsumer]',
    providers: [DestroyedService]
})
export class SkeletonConsumerDirective {
    /**
     * Whether to apply animation. True by default.
     */
    @Input()
    set fdSkeletonConsumerAnimation(value: BooleanInput) {
        this._config.animation = coerceBooleanProperty(value);

        if (this._callbacks.has(this._defaultCallbackFn)) {
            this._defaultCallbackFn(this._skeletonState);
        }
    }

    /** @hidden */
    protected _originalTabIndex: Nullable<number>;

    /** @hidden */
    private _elementRef: ElementRef<HTMLElement>;

    /** @hidden */
    private _skeletonState: boolean;

    /** @hidden */
    private _callbacks = new Set<SkeletonCallbackFn>();

    /** @hidden */
    protected get _classes(): string[] {
        const classesToManage = [DEFAULT_SKELETON_CLASS];

        if (this._config?.animation !== false) {
            classesToManage.push(SKELETON_ANIMATION_CLASS);
        }

        return classesToManage;
    }

    /** Current skeleton state */
    get skeletonState(): boolean {
        return this._skeletonState;
    }

    /** @hidden */
    constructor(
        protected readonly _injector: Injector,
        @Inject(SKELETON_CONFIG_TOKEN) @Optional() private readonly _config: SkeletonObserverConfig
    ) {
        // SKELETON_CONFIG_TOKEN will always be resolved to null if used as the directive
        const usedAsDirective = this._config === null;

        this._elementRef = inject(ElementRef);
        this._config = { ...defaultSkeletonConfig, ...this._config };

        const parentConsumer = inject(SkeletonConsumerDirective, { optional: true, skipSelf: true });
        const parentStateDirective = inject(SkeletonStateDirective, { optional: true });
        const parentTemplateDirective = inject(SkeletonTemplateDirective, { optional: true });
        const service = inject(SkeletonGlobalService, { optional: true });
        const onDestroy$ = inject(DestroyedService);

        getChangesSource$(parentStateDirective, service)
            .pipe(
                distinctUntilChanged(),
                filter(
                    () =>
                        !parentConsumer &&
                        !parentStateDirective?.fdSkeletonStateTemplate &&
                        !parentTemplateDirective?.fdSkeletonTemplate
                ),
                takeUntil(onDestroy$)
            )
            .subscribe((skeletonState) => {
                this._skeletonState = skeletonState;

                this._callCallbacks(skeletonState);
            });

        // Consume automatically only if used as the directive
        // Otherwise developer has to manually consume
        if (usedAsDirective) {
            this.consume();
        }
    }

    /**
     * Set callbacks that will be called when skeleton state changes.
     * If no callbacks are passed and directive created using factory function then the default consume logic will be set.
     * @param callbacks
     */
    consume(...callbacks: Array<SkeletonCallbackFn>): void {
        if (!callbacks.length) {
            if (!this._callbacks.has(this._defaultCallbackFn)) {
                this.consume(this._defaultCallbackFn);
            }

            return;
        }

        callbacks.forEach((callback) => {
            this._callbacks.add(callback);

            callback(this._skeletonState);
        });
    }

    /**
     * Remove callbacks that were previously set.
     * If no callbacks are passed and directive created using factory function then the default consume logic will be removed.
     * @param callbacks
     */
    removeConsumer(...callbacks: Array<SkeletonCallbackFn>): void {
        if (!callbacks.length) {
            if (this._callbacks.has(this._defaultCallbackFn)) {
                this.removeConsumer(this._defaultCallbackFn);
            }

            return;
        }

        callbacks.forEach((callback) => {
            this._callbacks.delete(callback);
        });
    }

    /** @hidden */
    private _callCallbacks(skeletonState: boolean): void {
        this._callbacks.forEach((callback) => callback(skeletonState));
    }

    /** @hidden */
    protected _defaultCallbackFn = (skeletonState): void => {
        this._manageCssClasses(skeletonState);
        this._manageTabIndex(skeletonState);
    };

    /** @hidden */
    private _manageCssClasses(skeletonState: boolean): void {
        if (skeletonState) {
            Object.values(this._classes).forEach((className) => {
                this._elementRef.nativeElement.classList.add(className);
            });
        } else {
            Object.values(this._classes).forEach((className) => {
                this._elementRef.nativeElement.classList.remove(className);
            });
        }
    }

    /** @hidden */
    private _manageTabIndex(skeletonState: boolean): void {
        if (skeletonState) {
            this._originalTabIndex = this._elementRef.nativeElement.tabIndex;
            this._elementRef.nativeElement.tabIndex = -1;
        } else if (this._originalTabIndex != null) {
            this._elementRef.nativeElement.tabIndex = this._originalTabIndex;
            this._originalTabIndex = null;
        }
    }
}
