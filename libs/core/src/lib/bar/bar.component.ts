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
export class BarComponent implements OnInit, OnChanges, CssClassBuilder {

    /** user's custom classes */
    private _class: string = '';
    @Input()
    set class(userClass: string) {
        this._class = userClass;
        this.buildComponentCssClass();
    }

    /** Whether the Bar component is used as a header, subheader, header-with-subheader,
     * footer or floating-footer. 
     * Types available: 'header' | 'subheader' | 'header-with-subheader' | 'footer' | 'floating-footer' */
    private _barDesign: BarDesignType;
    @Input()
    set barDesign(barDesign: BarDesignType) {
        this._barDesign = barDesign;
        this.buildComponentCssClass();
    }

    /** Whether the Bar component is used in Page Layout. */
    private _inPage: boolean;
    @Input()
    set inPage(inPage: boolean) {
        this._inPage = inPage;
        this.buildComponentCssClass();
    }

    /** Whether the Bar component is used in Home Page Layout. */
    private _inHomePage: boolean;
    @Input()
    set inHomePage(inHomePage: boolean) {
        this._inHomePage = inHomePage;
        this.buildComponentCssClass();
    }

    /** The size of the Page in Page responsive design. 
     * Available sizes: 's' | 'm_l' | 'xl'
    */
    private _size: SizeType = '';
    @Input()
    set size(size: SizeType) {
        this._size = size;
        this.buildComponentCssClass();
    }

    /** Whether to apply cosy mode to the Bar. */
    private _cosy: boolean;
    @Input()
    set cosy(cosy: boolean) {
        this._cosy = cosy;
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string {
        return [
            'fd-bar',
            this._cosy ? 'fd-bar--cosy' : '',
            this._barDesign ? `fd-bar--${this._barDesign}` : '',
            this._inPage && !this._size ? 'fd-bar--page' : '',
            this._inPage && this._size ? `fd-bar--page-${this._size}` : '',
            this._inHomePage && !this._size ? 'fd-bar--home-page' : '',
            this._inHomePage && this._size ? `fd-bar--home-page-${this._size}` : '',
            this.class
        ].filter(x => x !== '').join(' ');
    }

    /** @hidden */
    constructor(
        private _elementRef: ElementRef
    ) { }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }
}
