import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * A component used to enforce a certain layout for the action sheet.
 * ```html
 * <fd-action-sheet>
 *     <fd-action-sheet-control>Control Element</fd-action-sheet-control>
 *     <fd-action-sheet-item>Action Sheet Body</fd-action-sheet-item>
 * </fd-action-sheet>
 * ```
 */
@Component({
    selector: 'fd-action-sheet-item',
    templateUrl: './action-sheet-item.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ActionSheetItemComponent {}
