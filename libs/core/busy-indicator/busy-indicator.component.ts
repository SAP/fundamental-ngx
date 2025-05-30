import { TAB } from '@angular/cdk/keycodes';

import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    Input,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { KeyUtil, Nullable } from '@fundamental-ngx/cdk/utils';
import { FD_BUSY_INDICATOR_COMPONENT } from './tokens';

export type BusyIndicatorSize = 's' | 'm' | 'l';

@Component({
    selector: 'fd-busy-indicator',
    templateUrl: './busy-indicator.component.html',
    styleUrl: './busy-indicator.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    providers: [
        {
            provide: FD_BUSY_INDICATOR_COMPONENT,
            useExisting: BusyIndicatorComponent
        }
    ],
    host: {
        '[attr.role]': "loading ? 'progressbar' : 'presentation'",
        '[attr.tabindex]': 'loading ? 0 : -1',
        '[attr.aria-busy]': 'loading',
        '[attr.aria-live]': 'ariaLive',
        '[attr.aria-label]': 'ariaLabel',
        '[attr.aria-valuetext]': 'ariaValueText',
        '[attr.aria-valuemin]': '0',
        '[attr.aria-valuemax]': '100',
        '[attr.title]': 'title',
        '[class.fd-busy-indicator__container]': 'true',
        '[class.fd-busy-indicator__container--inline]': '!block'
    },
    imports: []
})
export class BusyIndicatorComponent {
    /** Whether to display the loading indicator animation. */
    @Input()
    loading: boolean;

    /** The size of the loading indicator, default will be medium */
    @Input()
    size: BusyIndicatorSize = 'm';

    /** Whether to use loader as block element */
    @Input()
    block = false;

    /** Aria label attribute value. */
    @Input()
    ariaLabel: Nullable<string>;

    /** Aria-valuetext attribute value. */
    @Input()
    ariaValueText: Nullable<string>;

    /** title attribute value for tooltip. */
    @Input()
    title: string;

    /** add loading label value */
    @Input()
    label?: string;

    /** Aria live attribute value. */
    @Input()
    ariaLive: Nullable<'assertive' | 'polite' | 'off'> = null;

    /** @hidden */
    @ViewChild('fakeFocusElement')
    fakeFocusElement: ElementRef;

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    /** @hidden If focus escapes busy container focus element after wrapped content */
    @HostListener('keydown', ['$event'])
    hostFocusChangeHandler(event: KeyboardEvent): void {
        if (this.loading && KeyUtil.isKeyCode(event, TAB) && !event.shiftKey) {
            this.fakeFocusElement.nativeElement.focus();
        }
    }

    /** @hidden If busy container is navigated as "previous focusable element",
     * focus busy indicator to prevent from focusing wrapped content */
    fakeElementFocusHandler(event: FocusEvent): void {
        if (this.loading && event.relatedTarget !== this._elementRef.nativeElement) {
            event.stopPropagation();
            this._elementRef.nativeElement.focus();
        }
    }
}
