import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

/**
 * A component used to enforce a certain layout for the action sheet.
 * ```html
 * <fd-action-sheet>
 *     <fd-action-sheet-control>Control Element</fd-action-sheet-control>
 *     <li fd-action-sheet-item>Action Sheet Body</li>
 *     <li fd-action-sheet-item>Action Sheet Body</li>
 *     <li fd-action-sheet-item>Action Sheet Body</li>
 * </fd-action-sheet>
 * ```
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-action-sheet-item]',
    templateUrl: './action-sheet-item.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'fd-action-sheet__item'
    }
})

export class ActionSheetItemComponent {

    @Input()
    label: string;

    @Input()
    glyph: string;

    @Input()
    negative = false;

    @Input()
    compact = false;
}
