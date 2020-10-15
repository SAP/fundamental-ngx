import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    Input,
    QueryList,
    ViewEncapsulation, ContentChild
} from '@angular/core';
import {ActionSheetItemComponent} from '../../..';

/**
 * A component used to enforce a certain layout for the action sheet.
 * ```html
 * <fd-action-sheet>
 *     <fd-action-sheet-control>Control Element</fd-action-sheet-control>
 *     <fd-action-sheet-body>
 *          <fd-action-sheet-item>Action Sheet Body</fd-action-sheet-item>
 *          <fd-action-sheet-item>Action Sheet Body</fd-action-sheet-item>
 *          <fd-action-sheet-item>Action Sheet Body</fd-action-sheet-item>
 *     </fd-action-sheet-body>
 * </fd-action-sheet>
 * ```
 */
@Component({
    selector: 'fd-action-sheet-body',
    templateUrl: './action-sheet-body.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionSheetBodyComponent {
    @ContentChildren(ActionSheetItemComponent) public actionSheetItems: QueryList<ActionSheetItemComponent>;

    /** Indicate if items should be in compact or compare mode. **/
    @Input()
    compact = false;

    /** Display the mobile view. **/
    @Input()
    mobile: false;

}
