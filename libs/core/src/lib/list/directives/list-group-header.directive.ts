import {
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    HostListener,
    Input,
    Output
} from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';

import { ListFocusItem } from '../list-focus-item.model';

let uniqueId = 0;

@Directive({
    selector: '[fdListGroupHeader], [fd-list-group-header]',
    host: {
        '[style.outline]': '"none"',
        '[class.fd-list__item]': 'true',
        '[class.fd-list__group-header]': 'true'
    },
    providers: [
        {
            provide: ListFocusItem,
            useExisting: forwardRef(() => ListGroupHeaderDirective)
        }
    ]
})
export class ListGroupHeaderDirective extends ListFocusItem {
    /** Whether to apply "aria-hidden" attribute. */
    @Input()
    @HostBinding('attr.aria-hidden')
    ariaHidden = true;

    /** id of an element to be applied */
    @Input()
    @HostBinding('attr.id')
    nativeElementId: string | null = `fd-list-group-header-${++uniqueId}`;

    /** tab index attribute */
    @Input()
    @HostBinding('attr.tabindex')
    get tabindex(): number {
        return this._tabIndex;
    }
    set tabindex(value: number) {
        this._tabIndex = coerceNumberProperty(value, -1);
    }
    /** @hidden Implementation of KeyboardSupportItemInterface */
    @Output()
    keyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    /** @hidden */
    clicked = new EventEmitter<MouseEvent>();

    /** @hidden */
    private _tabIndex = -1;

    constructor(readonly elementRef: ElementRef) {
        super(elementRef);
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {
        this.keyDown.emit(event);
    }
}
