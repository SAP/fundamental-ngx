import { ContentChild, Directive, ElementRef, Input, OnInit } from '@angular/core';
import { TabLinkDirective } from '../tab-link/tab-link.directive';
import { applyCssClass, CssClassBuilder } from '../../utils/public_api';


export type TabItemState = 'success' | 'error' | 'warning' | 'information' | 'neutral'

/**
 * Tab Item is optional wrapper for Tab link
 *
 * ```html
 * <div fd-tab-item>
 *    <a fd-tab-link>
 *        link
 *    </a>
 * </div>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tab-item]',
    host: {
        'class': 'fd-tabs__item'
    }
})
export class TabItemDirective implements CssClassBuilder, OnInit {

    /** @hidden */
    @ContentChild(TabLinkDirective)
    linkItem: TabLinkDirective;

    private _class: string = '';
    @Input()
    set class(userClass: string) {
        this._class = userClass;
        this.buildComponentCssClass();
    } // user's custom classes

    /** Semantic type of the tab item */
    private _tabItemState: TabItemState;
    @Input()
    set tabItemState(tabItemState: TabItemState) {
        this._tabItemState = tabItemState;
        this.buildComponentCssClass();
    }

    /** This should be used only on `filterMode`. Flag should be enable for first item */
    private _header: boolean;
    @Input()
    set header(header: boolean) {
        this._header = header;
        this.buildComponentCssClass();
    }

    get header(): boolean {
        return this._header;
    }

    /** Defines if there will be added fd-tabs__item class. Enabled by default. */
    @Input()
    fdTabItemClass: boolean = true;

    /** @hidden */
    constructor(
        private _elementRef: ElementRef
    ) {}

    /** @hidden
     * Function runs when component is initialized
     * function should build component css class
     */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string {
        return [
            this.fdTabItemClass ? 'fd-tabs__item' : '',
            this._header ? 'fd-tabs__item--header' : '',
            this._tabItemState ? `fd-tabs__item--${this._tabItemState}` : '',
            this._class
        ].filter(x => x !== '').join(' ');
    }

    /** HasElementRef interface implementation
     * function used by applyCssClass and applyCssStyle decorators
     */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
