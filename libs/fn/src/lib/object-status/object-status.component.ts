import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';
import { IconFont } from '@fundamental-ngx/core/icon';
import { Nullable } from '@fundamental-ngx/cdk/utils';

export type ObjectStatusState = 'positive' | 'critical' | 'negative' | 'info';

@Component({
    selector: 'fn-object-status',
    templateUrl: './object-status.component.html',
    styleUrls: ['./object-status.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.is-disabled]': 'disabled',
        '[class.fn-object-status--interactive]': 'interactive',
        '[class.fn-object-status--byline]': 'byline',
        '[attr.tabindex]': 'disabled || !interactive ? -1 : 0'
    }
})
export class ObjectStatusComponent {
    /** Object status text. */
    @Input()
    label: string;

    /** Object status state */
    @Input()
    state: ObjectStatusState = 'positive';

    /** The icon name to display. See the icon page for the list of icons
     * here: https://sap.github.io/fundamental-ngx/icon
     * */
    @Input() glyph;

    /**
     * The icon font
     * Options include: 'SAP-icons', 'BusinessSuiteInAppSymbols' and 'SAP-icons-TNT'
     */
    @Input() font: IconFont = 'SAP-icons';

    /** Aria-label for Icon. */
    @Input()
    iconAriaLabel: Nullable<string> = null;

    /** Whether element is disabled */
    @Input()
    disabled = false;

    /** Whether element is interactive */
    @Input()
    interactive = false;

    /** Whether element has byline size */
    @Input()
    byline = false;

    /** @hidden User's custom classes */
    @Input()
    class: string;

    /** @hidden */
    @HostBinding('attr.class')
    get _stateClass(): string {
        return ['fn-object-status', this.class, this.state ? `fn-object-status--${this.state}` : '']
            .filter((c) => !!c)
            .join(' ');
    }
}
