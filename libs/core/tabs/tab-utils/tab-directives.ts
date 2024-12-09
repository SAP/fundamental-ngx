import {
    ChangeDetectionStrategy,
    Component,
    Directive,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    ViewEncapsulation
} from '@angular/core';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconComponent, IconFont } from '@fundamental-ngx/core/icon';

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
    selector: '[fdTabTitleTemplate], [fd-tab-title-template]',
    standalone: true
})
export class TabTitleDirective {}

/**
 * Directive for counter element, available in most of the modes on `tab` component
 */
@Directive({
    selector: '[fdTabCount], [fd-tab-count]',
    standalone: true
})
export class TabCountDirective {
    /** @hidden */
    @HostBinding('class.fd-tabs__count')
    fdTabsCountClass = true;
}

/**
 * Directive for icon element, available in most of the modes on `tab` component
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-tab-icon]',
    template: `
        @if (icon) {
            <fd-icon role="presentation" [glyph]="icon" [font]="iconFont"></fd-icon>
        }
        <ng-content></ng-content>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [IconComponent]
})
export class TabIconComponent implements CssClassBuilder, OnChanges {
    /** Apply user custom styles */
    @Input()
    class: string;

    /**
     * The icon to include inside the element
     * See the icon page for the list of icons.
     */
    @Input()
    icon: string;

    /** Icon font family */
    @Input()
    iconFont: IconFont = FD_DEFAULT_ICON_FONT_FAMILY;

    /** @hidden */
    constructor(public readonly elementRef: ElementRef) {}

    /** @hidden CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return ['fd-tabs__icon', this.class];
    }

    /** @hidden
     * Function runs when component is initialized
     * function should build component css class
     * function should build css style
     */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }
}

@Directive({
    selector: '[fdTabTag], [fd-tab-tag]',
    host: {
        class: 'fd-tabs__tag'
    },
    standalone: true
})
export class TabTagDirective {}

@Directive({
    selector: '[fdTabLabel], [fd-tab-label]',
    host: {
        class: 'fd-tabs__label'
    },
    standalone: true
})
export class TabLabelDirective {}

@Directive({
    selector: '[fdTabProcess], [fd-tab-process]',
    host: {
        class: 'fd-tabs__process'
    },
    standalone: true
})
export class TabProcessDirective {}

@Directive({
    selector: '[fdTabHeader], [fd-tab-header]',
    host: {
        class: 'fd-tabs__header'
    },
    standalone: true
})
export class TabHeaderDirective {}

@Directive({
    selector: '[fdTabCounterHeader], [fd-tab-counter-header]',
    host: {
        class: 'fd-tabs__counter-header'
    },
    standalone: true
})
export class TabCounterHeaderDirective {}

@Directive({
    selector: '[fdTabProcessIcon], [fd-tab-process-icon]',
    host: {
        class: 'fd-tabs__process-icon'
    },
    standalone: true
})
export class TabProcessIconDirective {}

@Directive({
    selector: '[fdTabSeparator], [fd-tab-separator]',
    host: {
        class: 'fd-tabs__separator'
    },
    standalone: true
})
export class TabSeparatorDirective {}
