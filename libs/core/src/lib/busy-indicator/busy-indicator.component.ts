import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

export type BusyIndicatorSize = 's' | 'm' | 'l';

@Component({
    selector: 'fd-busy-indicator',
    templateUrl: './busy-indicator.component.html',
    styleUrls: ['./busy-indicator.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.tabindex]': 'focusable ? 0 : -1',
        '[attr.aria-busy]': 'loading',
        '[attr.aria-live]': 'ariaLive',
        '[attr.aria-hidden]': 'loading',
        '[attr.aria-label]': 'ariaLabel',
        '[class.fd-busy-indicator__container]': 'true',
        '[class.fd-busy-indicator__container--inline]': 'inline',
    }
})
export class BusyIndicatorComponent {
    /** Whether to display the loading indicator animation. */
    @Input()
    loading: boolean;

    /** The size of the loading indicator, default will be medium */
    @Input()
    size: BusyIndicatorSize = 'm';

    /** Whether to use loader as inline element */
    @Input()
    inline: boolean = false;

    /** Whether busy indicator can be focused */
    @Input()
    focusable: boolean = true;

    /** Whether busy indicator can be focused */
    @Input()
    focusableContent: boolean = false;

    /** Aria label attribute value. */
    @Input()
    ariaLabel: string = 'Loading';

    /** Aria live attribute value. */
    @Input()
    ariaLive: 'assertive' | 'polite' | null = 'polite';
}
