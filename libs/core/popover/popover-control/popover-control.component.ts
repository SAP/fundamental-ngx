import { AfterContentChecked, Directive, ElementRef } from '@angular/core';

/**
 * A component used to enforce a certain layout for the popover.
 * ```html
 * <fd-popover>
 *     <fd-popover-control>Control Element</fd-popover-control>
 *     <fd-popover-body>Popover Body</fd-popover-body>
 * </fd-popover>
 * ```
 */
@Directive({
    selector: 'fd-popover-control, [fdPopoverControl]',
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class PopoverControlComponent implements AfterContentChecked {
    /** @hidden */
    _tabbable = false;

    /** @hidden */
    constructor(public elRef: ElementRef) {}

    /** @hidden */
    ngAfterContentChecked(): void {
        if (this._tabbable) {
            this.makeTabbable();
        }
    }

    /** @hidden */
    makeTabbable(): void {
        const elemChild = this.elRef.nativeElement.children[0];
        if (elemChild && elemChild.getAttribute('tabindex') !== '-1') {
            elemChild.tabIndex = '0';
        }
    }
}
