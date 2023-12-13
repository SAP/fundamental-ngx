import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

let uniqueId = 0;

@Directive({
    selector: '[fdListGroupHeader], [fd-list-group-header]',
    host: {
        '[style.outline]': '"none"',
        '[class.fd-list__item]': 'true',
        '[class.fd-list__group-header]': 'true'
    },
    standalone: true
})
export class ListGroupHeaderDirective {
    /** id of an element to be applied */
    @Input()
    @HostBinding('attr.id')
    nativeElementId: string | null = `fd-list-group-header-${++uniqueId}`;

    /** @ignore Implementation of KeyboardSupportItemInterface */
    @Output()
    keyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    /** @ignore */
    constructor(readonly elementRef: ElementRef) {}

    /** @ignore */
    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {
        this.keyDown.emit(event);
    }
}
