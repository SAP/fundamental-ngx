import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-table-toolbar-left-actions',
    template: `
        <ng-template>
            <ng-content></ng-content>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableToolbarLeftActionsComponent {
    /** @hidden */
    @ViewChild(TemplateRef)
    _contentTemplateRef: TemplateRef<any>;
}
