import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    Input,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { KeyUtil } from '../utils/functions/key-util';

export type BusyIndicatorSize = 's' | 'm' | 'l';

@Component({
    selector: 'fd-busy-indicator',
    templateUrl: './busy-indicator.component.html',
    styleUrls: ['./busy-indicator.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'aria-role': 'progressbar',
        '[attr.tabindex]': 'loading ? 0 : -1',
        '[attr.aria-busy]': 'loading',
        '[attr.aria-live]': 'ariaLive',
        '[attr.aria-label]': 'ariaLabel',
        '[class.fd-busy-indicator__container]': 'true',
        '[class.fd-busy-indicator__container--inline]': '!block'
    }
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
    block: boolean = false;

    /** Aria label attribute value. */
    @Input()
    ariaLabel: string = 'Loading';

    /** Aria live attribute value. */
    @Input()
    ariaLive: 'assertive' | 'polite' | null = 'polite';

    /** @hidden */
    @ViewChild('fakeFocusElement')
    fakeFocusElement: ElementRef;

    constructor(private _elementRef: ElementRef) { }

    /** @hidden If focus escapes busy container focus element after wrapped content */
    @HostListener('keydown', ['$event'])
    hostFocusChangeHandler(event: KeyboardEvent): void {
        if (this.loading && KeyUtil.isKey(event, 'Tab') && !event.shiftKey) {
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
