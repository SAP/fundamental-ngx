import { Component, ViewEncapsulation } from '@angular/core';

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
    encapsulation: ViewEncapsulation.None
})
export class PopoverControlComponent {}
