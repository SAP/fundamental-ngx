import { Directive, TemplateRef, inject } from '@angular/core';

/**
 * Marks the content template of a side panel item (content group).
 *
 * The template is captured by the parent `fd-side-panel-item` and rendered in the
 * content panel only while its item is active. Deferring with a template means the
 * group content is not instantiated until the group is opened.
 *
 * ```html
 * <fd-side-panel-item icon="filter" label="Filter">
 *     <ng-template fdSidePanelContent>
 *         <!-- group content -->
 *     </ng-template>
 * </fd-side-panel-item>
 * ```
 */
@Directive({
    selector: '[fdSidePanelContent]'
})
export class SidePanelContentDirective {
    /** Reference to the captured content template. */
    readonly templateRef = inject<TemplateRef<void>>(TemplateRef);
}
