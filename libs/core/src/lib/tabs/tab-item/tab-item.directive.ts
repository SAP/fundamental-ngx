import { ContentChild, Directive, ElementRef, HostBinding, Input, OnChanges, OnInit } from '@angular/core';
import { TabLinkDirective } from '../tab-link/tab-link.directive';
import { applyCssClass, CssClassBuilder } from '../../utils/public_api';

export type TabItemState = 'success' | 'error' | 'warning' | 'information' | 'neutral';

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
        class: 'fd-tabs__item'
    }
})
export class TabItemDirective implements CssClassBuilder, OnChanges, OnInit {
    /** Apply user custom styles */
    @Input()
    class = '';

    /** Semantic type of the tab item */
    @Input()
    tabItemState: TabItemState;

    /** This should be used only on `filterMode`. Flag should be enable for first item */
    @Input()
    header: boolean;

    /** Disabled state for tab item */
    @Input()
    @HostBinding('attr.aria-disabled')
    @HostBinding('class.is-disabled')
    disabled = false;

    /** Defines if there will be added fd-tabs__item class. Enabled by default. */
    @Input()
    fdTabItemClass = true;

    /** @ */
    @Input()
    tabId: string;

    /** @hidden */
    @ContentChild(TabLinkDirective)
    linkItem: TabLinkDirective;

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [
            this.fdTabItemClass ? 'fd-tabs__item' : '',
            this.header ? 'fd-tabs__item--header' : '',
            this.tabItemState ? `fd-tabs__item--${this.tabItemState}` : '',
            this.class
        ];
    }

    /** HasElementRef interface implementation
     * function used by applyCssClass and applyCssStyle decorators
     */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
