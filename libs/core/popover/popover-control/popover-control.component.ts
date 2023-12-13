import { AfterContentChecked, ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation } from '@angular/core';

/**
 * A component used to enforce a certain layout for the popover.
 * ```html
 * <fd-popover>
 *     <fd-popover-control>Control Element</fd-popover-control>
 *     <fd-popover-body>Popover Body</fd-popover-body>
 * </fd-popover>
 * ```
 */
@Component({
    selector: 'fd-popover-control, [fdPopoverControl]',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class PopoverControlComponent implements AfterContentChecked {
    /** @ignore */
    _tabbable = false;

    /** @ignore */
    constructor(public elRef: ElementRef) {}

    /** @ignore */
    ngAfterContentChecked(): void {
        if (this._tabbable) {
            this.makeTabbable();
        }
    }

    /** @ignore */
    makeTabbable(): void {
        const elemChild = this.elRef.nativeElement.children[0];
        if (elemChild && elemChild.getAttribute('tabindex') !== '-1') {
            elemChild.tabIndex = '0';
        }
    }
}
