import { Directive, ElementRef, HostListener, Inject, OnInit, Optional } from '@angular/core';
import { MicroProcessFlowComponentInterface, MICRO_PROCESS_FLOW } from './injection-tokens';

@Directive({
    selector: '[fdMicroProcessFlowFocusableItem], [fd-micro-process-flow-focusable-item]',
    host: {
        class: 'fd-micro-process-flow__focusable-item'
    }
})
export class MicroProcessFlowFocusableItemDirective implements OnInit {
    /** @hidden */
    constructor(
        public elRef: ElementRef<HTMLElement>,
        @Optional() @Inject(MICRO_PROCESS_FLOW) private _microProcessFlow: MicroProcessFlowComponentInterface
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this.setFocusable();
    }

    /** Sets ability to focus on the element or not. */
    setFocusable(focusable = false): void {
        this.elRef.nativeElement.setAttribute('tabindex', focusable ? '0' : '-1');
    }

    /** Focuses on the element without scrolling it to the viewport */
    focus(options: FocusOptions): void {
        this.elRef.nativeElement.focus(options);
    }

    /**
     * @hidden
     * Handler for focus events
     */
    @HostListener('focus')
    onFocus(): void {
        this._microProcessFlow?.setFocusedElementIndex(this.elRef.nativeElement);
        this._microProcessFlow?.canItemsReceiveFocus.next(false);
    }

    /** @hidden */
    @HostListener('blur')
    onBlur(): void {
        this._microProcessFlow?.canItemsReceiveFocus.next(true);
    }
}
