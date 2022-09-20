import { Directive, ElementRef, Inject, InjectFlags, InjectionToken, Injector, Input, Optional } from '@angular/core';
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
const SKELETON_NATIVE_CLASS = 'fd-skeleton--native';

const defaultSkeletonConfig: SkeletonObserverConfig = {
    apply: true,
    modifiers: undefined,
    animation: true,
    native: false
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
     * Whether to apply modifier classes. True by default.
     */
    @Input()
    set fdSkeletonConsumerApply(value: BooleanInput) {
        this._config.apply = coerceBooleanProperty(value);

        if (this._callbacks.has(this._defaultCallbackFn)) {
            this._defaultCallbackFn(this._skeletonState);
        }
    }

    /**
     * Custom skeleton classes.
     * When provided all other fields has no power!
     */
    @Input()
    set fdSkeletonConsumerModifiers(value: string[]) {
        this._config.modifiers = value;

        if (this._callbacks.has(this._defaultCallbackFn)) {
            this._defaultCallbackFn(this._skeletonState);
        }
    }

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

    /**
     * Whether skeleton should be created without pseudo-elements.
     * Useful for inputs, etc. where we cannot use ::before & ::after pseudo elements.
     * Cannot be used together with text flag!
     */
    @Input()
    set fdSkeletonConsumerNative(value: BooleanInput) {
        this._config.native = coerceBooleanProperty(value);

        if (this._callbacks.has(this._defaultCallbackFn)) {
            this._defaultCallbackFn(this._skeletonState);
        }
    }

    /** @hidden */
    protected get _apply(): boolean {
        return this._config?.apply ?? true;
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
    protected get _modifiers(): string[] {
        if (this._config.modifiers) {
            return [...this._config.modifiers];
        }

        const classesToManage = [DEFAULT_SKELETON_CLASS];

        if (this._config?.animation !== false) {
            classesToManage.push(SKELETON_ANIMATION_CLASS);
        }

        if (this._config?.native) {
            classesToManage.push(SKELETON_NATIVE_CLASS);
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

        this._elementRef = _injector.get(ElementRef);
        this._config = { ...defaultSkeletonConfig, ...this._config };

        const parentConsumer = _injector.get(
            SkeletonConsumerDirective,
            null,
            // eslint-disable-next-line no-bitwise
            InjectFlags.Optional | InjectFlags.SkipSelf
        );
        const parentStateDirective = _injector.get(SkeletonStateDirective, null, InjectFlags.Optional);
        const parentTemplateDirective = _injector.get(SkeletonTemplateDirective, null, InjectFlags.Optional);
        const service = _injector.get(SkeletonGlobalService, null, InjectFlags.Optional);
        const onDestroy$ = this._injector.get(DestroyedService);

        getChangesSource$(parentStateDirective, service)
            .pipe(
                distinctUntilChanged(),
                filter(
                    () =>
                        !parentConsumer?._apply &&
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
        this._manageWidth(skeletonState);
    };

    /** @hidden */
    private _manageCssClasses(skeletonState: boolean): void {
        if (!this._apply) {
            return;
        }

        if (skeletonState) {
            Object.values(this._modifiers).forEach((className) => {
                this._elementRef.nativeElement.classList.add(className);
            });
        } else {
            Object.values(this._modifiers).forEach((className) => {
                this._elementRef.nativeElement.classList.remove(className);
            });
        }
    }

    /** @hidden */
    private _manageTabIndex(skeletonState: boolean): void {
        if (!this._apply) {
            return;
        }

        if (skeletonState) {
            this._originalTabIndex = this._elementRef.nativeElement.tabIndex;
            this._elementRef.nativeElement.tabIndex = -1;
        } else if (this._originalTabIndex != null) {
            this._elementRef.nativeElement.tabIndex = this._originalTabIndex;
            this._originalTabIndex = null;
        }
    }

    /** @hidden */
    private _manageWidth(skeletonState: boolean): void {
        if (!this._apply) {
            return;
        }

        if (skeletonState) {
            const windowWidth = window.innerWidth;
            const hostWidth = this._elementRef.nativeElement.offsetWidth;

            // Lazy algorithm here
            // If element takes more than 50% of the window width
            // It makes sense to have a skeleton for it with the 40% of the element's width
            if (hostWidth > windowWidth * 0.5) {
                this._elementRef.nativeElement.style.setProperty('--fdSkeletonWidth', '40%');
            }
        } else {
            this._elementRef.nativeElement.style.removeProperty('--fdSkeletonWidth');
        }
    }
}
