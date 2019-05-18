import { Component, ContentChild, Input, ViewEncapsulation } from '@angular/core';
import { SearchInputComponent } from '../../search-input/search-input.component';

/**
 * The component that represents a shellbar action.
 * ```html
 *  <fd-shellbar-action *ngFor="let action of actions"
 *                      [glyph]="action.glyph"
 *                      [callback]="action.callback"
 *                      [label]="action.label"
 *                      [notificationCount]="action.notificationCount"
 *                      [notificationLabel]="action.notificationLabel">
 *  </fd-shellbar-action>
 * ```
 */
@Component({
    selector: 'fd-shellbar-action',
    templateUrl: './shellbar-action.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ShellbarActionComponent {

    /** The glyph (icon) name */
    @Input()
    glyph: string;

    /** Callback that hanldles the response to clicks on any of the actions. */
    @Input()
    callback: Function;

    /** The action label. */
    @Input()
    label: string;

    /** The notification label. */
    @Input()
    notificationLabel: string;

    /** Represents the number of notifications. */
    @Input()
    notificationCount: number;

    /** @hidden */
    @ContentChild(SearchInputComponent)
    searchInputComponent: SearchInputComponent;

}
