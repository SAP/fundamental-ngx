import { AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation } from '@angular/core';

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
    styleUrls: ['./popover-control.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverControlComponent implements AfterContentInit {
    constructor(public elRef: ElementRef) {}

    ngAfterContentInit(): void {
        const elemChild = this.elRef.nativeElement.children[0];
        if (elemChild?.getAttribute('tabindex') !== '-1') {
            elemChild.tabIndex = '0';
            elemChild.classList.add('fd-popover-outline');
        }
    }
}
