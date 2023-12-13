import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-table-toolbar-left-actions',
    template: `
        <ng-template>
            <ng-content></ng-content>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true
})
export class TableToolbarLeftActionsComponent {
    /** @ignore */
    @ViewChild(TemplateRef)
    _contentTemplateRef: TemplateRef<any>;
}
