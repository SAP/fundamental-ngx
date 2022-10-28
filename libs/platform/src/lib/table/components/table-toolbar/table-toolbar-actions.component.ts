import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';

/**
 * The component that represents a table toolbar actions.
 * ```html
 * <fdp-table-toolbar-actions>
 *  <fdp-button label="Action One"></fdp-button>
 *  <fdp-button label="Action Two"></fdp-button>
 * </fdp-table-toolbar-actions>
 * ```
 * */
@Component({
    selector: 'fdp-table-toolbar-actions',
    template: `
        <ng-template>
            <ng-content></ng-content>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableToolbarActionsComponent {
    /** @hidden */
    @ViewChild(TemplateRef)
    contentTemplateRef: TemplateRef<any>;
}
