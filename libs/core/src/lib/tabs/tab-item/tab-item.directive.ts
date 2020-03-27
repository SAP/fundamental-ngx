import { ContentChild, Directive, ElementRef, Input, OnChanges } from '@angular/core';
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
export class TabItemDirective implements CssClassBuilder, OnChanges {
    /** Apply user custom styles */
    @Input()
    public class: string = '';

    /** Semantic type of the tab item */
    @Input()
    public tabItemState: TabItemState;

    /** This should be used only on `filterMode`. Flag should be enable for first item */
    @Input()
    public header: boolean;

    /** Defines if there will be added fd-tabs__item class. Enabled by default. */
    @Input()
    public fdTabItemClass: boolean = true;

    /** @hidden */
    @ContentChild(TabLinkDirective)
    public linkItem: TabLinkDirective;

    /** @hidden */
    constructor(
        private _elementRef: ElementRef
    ) { }

    /** @hidden
     * Function runs when component is initialized
     * function should build component css class
     */
    public ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    public buildComponentCssClass(): string {
        return [
            this.fdTabItemClass ? 'fd-tabs__item' : '',
            this.header ? 'fd-tabs__item--header' : '',
            this.tabItemState ? `fd-tabs__item--${this.tabItemState}` : '',
            this.class
        ].filter(x => x !== '').join(' ');
    }

    /** HasElementRef interface implementation
     * function used by applyCssClass and applyCssStyle decorators
     */
    public elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
