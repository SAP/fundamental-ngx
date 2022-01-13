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
    /** id of an element to be applied */
    @Input()
    @HostBinding('attr.id')
    nativeElementId: string | null = `fd-list-group-header-${++uniqueId}`;

    /** @hidden Implementation of KeyboardSupportItemInterface */
    @Output()
    keyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    constructor(readonly elementRef: ElementRef) {
        super(elementRef);
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {
        this.keyDown.emit(event);
    }
}
