import { ChangeDetectorRef, Directive, InjectFlags, Input, OnDestroy, OnInit } from '@angular/core';
// eslint-disable-next-line
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Nullable } from '@fundamental-ngx/core/shared';
import { ContentDensity, ContentDensityService } from '@fundamental-ngx/core/utils';
import { PlatformConfig } from './platform.config';

let randomId = 0;

/**
 * This class contains common properties used across components.
 * this can be extended to reduce the code duplication across components.
 * @hidden for form related Base , see BaseInput.
 */
@Directive()
export abstract class BaseComponent implements OnInit, OnDestroy {
    protected defaultId = `fdp-id-${randomId++}`;
    protected _disabled = false;

    /** Sets the `aria-label` attribute to the element. */
    @Input()
    ariaLabel: Nullable<string>;

    /** Sets the `aria-labelledby` attribute to the element. */
    @Input()
    ariaLabelledBy: Nullable<string>;

    /** Sets the `aria-describedby` attribute to the element. */
    @Input()
    ariaDescribedBy: Nullable<string>;

    /** id for the Element */
    @Input()
    id: string = this.defaultId;

    /** name for the element */
    @Input()
    name: string;

    /** content Density of element. cozy | compact | condensed*/
    @Input()
    set contentDensity(contentDensity: ContentDensity) {
        this._contentDensity = contentDensity;
    }
    get contentDensity(): ContentDensity {
        return this._contentDensity ?? 'cozy';
    }
    /** @hidden - Avoiding private property name collision */
    _contentDensity?: ContentDensity = 'cozy';
    protected _contentDensityService: ContentDensityService | null = null;

    /** @hidden */
    protected _subscriptions = new Subscription();

    /** @hidden */
    protected _router: Router;

    /** width of the element */
    @Input()
    width: string;

    /** disabled status of the element */
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(disabled: boolean) {
        this._disabled = disabled;
    }

    constructor(protected _cd: ChangeDetectorRef) {
        const injector = PlatformConfig.getInjector();
        // There is an issue in ViewEngine, it simply ignores InjectFlags.Optional
        // so to make it work in ViewEngine we need to to use notFoundValue as "null" and avoid "undefined"
        // cause "undefined" is equal to Injector.THROW_IF_NOT_FOUND
        this._contentDensityService = injector?.get(ContentDensityService, null, InjectFlags.Optional) || null;
    }

    /** @hidden */
    ngOnInit(): void {
        this._setupDensitySubscriptions();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    private _setupDensitySubscriptions(): void {
        if (this._contentDensity === undefined && this._contentDensityService) {
            this._subscriptions.add(
                this._contentDensityService._contentDensityListener.subscribe((density) => {
                    this.contentDensity = density;
                    this.markForCheck();
                })
            );
        }
    }

    /**
     * @hidden
     * For internal usage only
     *
     * Since all components use OnPush strategy in the fundamental lib
     * it's tricky to update a child input directly from a parent component class
     *
     */
    markForCheck(): void {
        this._cd.markForCheck();
    }

    /**
     * @hidden
     * For internal usage only
     *
     * Since all components use OnPush strategy in the fundamental lib
     * it's tricky to update a child input directly from a parent component class
     *
     */
    detectChanges(): void {
        this._cd.detectChanges();
    }
}
