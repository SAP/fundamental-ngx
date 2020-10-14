import {ChangeDetectionStrategy, Component, ContentChild, Input, ViewEncapsulation} from '@angular/core';

/**
 * A component used to enforce a certain layout for the action sheet.
 * ```html
 * <fd-action-sheet>
 *     <fd-action-sheet-control>Control Element</fd-action-sheet-control>
 *     <fd-action-sheet-item>Action Sheet Body</fd-action-sheet-item>
 *     <fd-action-sheet-item>Action Sheet Body</fd-action-sheet-item>
 *     <fd-action-sheet-item>Action Sheet Body</fd-action-sheet-item>
 * </fd-action-sheet>
 * ```
 */
@Component({
    selector: 'fd-action-sheet-item',
    templateUrl: './action-sheet-item.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'fd-action-sheet__item'
    }
})

export class ActionSheetItemComponent {

    /** Sets text of button. */
    @Input()
    label: string;

    /** Sets icon of action item. */
    @Input()
    glyph: string;

    /** Indicate state of the button.*/
    @Input()
    negative = false;

    /** Indicate if items should be in compact or compare mode. **/
    @Input()
    compact = false;

    /** Display the mobile view. **/
    @Input()
    mobile = false;

}
