import { booleanAttribute, Component, contentChild, input, ViewEncapsulation } from '@angular/core';
import { SidePanelContentDirective } from './side-panel-content.directive';

let sidePanelItemId = 0;

/**
 * A single side panel item — one content group reachable from the action bar.
 *
 * Each item contributes one action button to the vertical action bar (rendered by the
 * parent `fd-side-panel`) and carries the group's content template, projected via
 * `*fdSidePanelContent`. Opening/closing the content panel is wired in a later issue;
 * here the item only supplies the action-button metadata and captures its content.
 *
 * ```html
 * <fd-side-panel-item icon="filter" label="Filter">
 *     <ng-template fdSidePanelContent>...</ng-template>
 * </fd-side-panel-item>
 * ```
 */
@Component({
    selector: 'fd-side-panel-item',
    template: '',
    encapsulation: ViewEncapsulation.None
})
export class SidePanelItemComponent {
    /**
     * Stable identifier for the group. Used as the value of the parent's `activeItem`.
     * A sequential default is provided when none is set.
     */
    readonly id = input(`fd-side-panel-item-${++sidePanelItemId}`);

    /** Icon name (glyph) shown on the action button. */
    readonly icon = input<string>();

    /** Group name. Shown as the tooltip and used as the action button's accessible label. */
    readonly label = input<string>('');

    /** Whether the item is disabled. Disabled items cannot be activated. */
    readonly disabled = input(false, { transform: booleanAttribute });

    /**
     * Numeric count shown on the action button (e.g. unread message count).
     * Values above 99 are capped and displayed as `99+`.
     * When not set, no counter is shown.
     */
    readonly counter = input<number>();

    /** @hidden Captured content template, rendered by the parent while the item is active. */
    protected readonly content = contentChild(SidePanelContentDirective);
}
