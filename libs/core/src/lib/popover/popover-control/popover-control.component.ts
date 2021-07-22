import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation } from '@angular/core';

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
    selector: 'fd-popover-control',
    templateUrl: './popover-control.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverControlComponent {

    /** @hidden */
    constructor(public elRef: ElementRef) {}

    /** @hidden */
    makeTabbable(): void {
        const elemChild = this.elRef.nativeElement.children[0];
        if (elemChild && elemChild.getAttribute('tabindex') !== '-1') {
            elemChild.tabIndex = '0';
        }
    }
}
