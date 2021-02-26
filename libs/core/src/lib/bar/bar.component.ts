import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges, OnDestroy,
    OnInit, Optional,
    ViewEncapsulation
} from '@angular/core';
import { applyCssClass, ContentDensityService, CssClassBuilder } from '../utils/public_api';
import { Subscription } from 'rxjs';

export type SizeType = '' | 's' | 'm_l' | 'xl';
export type BarDesignType = 'header' | 'subheader' | 'header-with-subheader' | 'footer' | 'floating-footer';

/**
 * The Bar component is a container that holds titles, buttons and input controls.
 * Its content is distributed in three areas - left, middle and right.
 * The Bar has 2 modes - Desktop (default) and Tablet/Mobile (cozy).
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-bar]',
    templateUrl: './bar.component.html',
    styleUrls: ['./bar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarComponent implements OnChanges, OnInit, CssClassBuilder, OnDestroy {
    /** user's custom classes */
    @Input()
    class: string;

    /** Whether the Bar component is used as a header, subheader, header-with-subheader,
     * footer or floating-footer.
     * Types available: 'header' | 'subheader' | 'header-with-subheader' | 'footer' | 'floating-footer' */
    @Input()
    barDesign: BarDesignType;

    /** Whether the Bar component is used in Page Layout. */
    @Input()
    inPage: boolean;

    /** Whether the Bar component is used in Home Page Layout. */
    @Input()
    inHomePage: boolean;

    /** The size of the Page in Page responsive design.
     * Available sizes: 's' | 'm_l' | 'xl'
     */
    @Input()
    size: SizeType = '';

    /** Whether to apply cozy mode to the Bar. */
    @Input()
    cozy: boolean = null;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(private _elementRef: ElementRef, @Optional() private _contentDensityService: ContentDensityService) {}

    /** @hidden */
    ngOnInit(): void {
        if (this.cozy === null && this._contentDensityService) {
            this._subscriptions.add(this._contentDensityService.contentDensity.subscribe(density => {
                this.cozy = density === 'cozy';
                this.buildComponentCssClass();
            }));
        }
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [
            'fd-bar',
            this.cozy ? 'fd-bar--cozy' : '',
            this.barDesign ? `fd-bar--${this.barDesign}` : '',
            this.inPage && !this.size ? 'fd-bar--page' : '',
            this.inPage && this.size ? `fd-bar--page-${this.size}` : '',
            this.inHomePage && !this.size ? 'fd-bar--home-page' : '',
            this.inHomePage && this.size ? `fd-bar--home-page-${this.size}` : '',
            this.class
        ];
    }

    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
