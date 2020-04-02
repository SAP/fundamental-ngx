import {
    Directive,
    ElementRef,
    EmbeddedViewRef,
    HostBinding,
    Input,
    OnInit,
    TemplateRef,
    ViewContainerRef,
    OnChanges,
} from '@angular/core';
import { applyCssClass, CssClassBuilder } from '../../utils/public_api';

/**
 * Directive used to identify the template which will populate the tab header.
 * Used to achieve complex headers that require more than a string.
 *
 * ```html
 * <fd-tab>
 *      <ng-template fd-tab-title>
 *          <fd-icon [glyph]="'delete'"></fd-icon>
 *          <span>Tab Label</span>
 *      </ng-template>
 * </fd-tab>
 * ```
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tab-title-template]',
})
export class TabTitleDirective {}

/**
 * Not for external use. Portal to render the complex title template.
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tab-load-title]',
})
export class TabLoadTitleDirective implements OnInit {
    @Input('fd-tab-load-title')
    content: TemplateRef<any>;

    private contentRef: EmbeddedViewRef<any>;

    constructor(private _viewRef: ViewContainerRef) {}

    ngOnInit(): void {
        this._viewRef.clear();
        this.contentRef = this._viewRef.createEmbeddedView(this.content);
    }
}

/**
 * Directive for counter element, available in most of modes on `tab` component
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tab-count]',
})
export class TabCountDirective {
    /** @hidden */
    @HostBinding('class.fd-tabs__count')
    fdTabsCountClass: boolean = true;
}

/**
 * Directive for icon element, available in most of modes on `tab` component
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tab-icon]',
})
export class TabIconDirective implements CssClassBuilder, OnChanges {
    /** Apply user custom styles */
    @Input()
    class: string;

    /** Defines if there will be added fd-tabs-icon class. Enabled by default. */
    fdTabIconClass: boolean = true;

    /**
     * The icon to include inside the element
     * See the icon page for the list of icons.
     */
    @Input()
    icon: string;

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    /** @hidden
     * Function runs when component is initialized
     * function should build component css class
     * function should build css style
     */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string {
        return [this.fdTabIconClass ? 'fd-tabs__icon' : '', this.icon ? `sap-icon--${this.icon}` : '', this.class]
            .filter((x) => x !== '')
            .join(' ');
    }

    /** HasElementRef interface implementation
     * function used by applyCssClass and applyCssStyle decorators
     */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tab-tag]',
    host: {
        class: 'fd-tabs__tag',
    },
})
export class TabTagDirective {}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tab-label]',
    host: {
        class: 'fd-tabs__label',
    },
})
export class TabLabelDirective {}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tab-process]',
    host: {
        class: 'fd-tabs__process',
    },
})
export class TabProcessDirective {}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tab-header]',
    host: {
        class: 'fd-tabs__header',
    },
})
export class TabHeaderDirective {}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tab-counter-header]',
    host: {
        class: 'fd-tabs__counter-header',
    },
})
export class TabCounterHeaderDirective {}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tab-process-icon]',
    host: {
        class: 'fd-tabs__process-icon',
    },
})
export class TabProcessIconDirective {}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tab-separator]',
    host: {
        class: 'fd-tabs__separator',
    },
})
export class TabSeparatorDirective {}
