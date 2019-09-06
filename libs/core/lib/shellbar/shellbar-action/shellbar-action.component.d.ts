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
export declare class ShellbarActionComponent {
    /** The glyph (icon) name */
    glyph: string;
    /** Callback that hanldles the response to clicks on any of the actions. */
    callback: Function;
    /** The action label. */
    label: string;
    /** The notification label. */
    notificationLabel: string;
    /** Represents the number of notifications. */
    notificationCount: number;
}
