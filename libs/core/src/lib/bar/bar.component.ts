import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { applyCssClass, CssClassBuilder } from '../utils/public_api';

export type SizeType = '' | 's' | 'm_l' | 'xl';
export type BarDesignType = 'header' | 'subheader' | 'header-with-subheader' | 'footer' | 'floating-footer';

/**
 * The Bar component is a container that holds titles, buttons and input controls.
 * Its content is distributed in three areas - left, middle and right.
 * The Bar has 2 modes - Desktop (default) and Tablet/Mobile (cosy).
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-bar]',
    templateUrl: './bar.component.html',
    styleUrls: ['./bar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarComponent implements OnChanges, OnInit, CssClassBuilder {

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

    /** Whether to apply cosy mode to the Bar. */
    @Input()
    cosy: boolean;

    /** @hidden */
    constructor(
        private _elementRef: ElementRef
    ) { }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string {
        return [
            'fd-bar',
            this.cosy ? 'fd-bar--cosy' : '',
            this.barDesign ? `fd-bar--${this.barDesign}` : '',
            this.inPage && !this.size ? 'fd-bar--page' : '',
            this.inPage && this.size ? `fd-bar--page-${this.size}` : '',
            this.inHomePage && !this.size ? 'fd-bar--home-page' : '',
            this.inHomePage && this.size ? `fd-bar--home-page-${this.size}` : '',
            this.class
        ].filter(x => x !== '').join(' ');
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }
}
