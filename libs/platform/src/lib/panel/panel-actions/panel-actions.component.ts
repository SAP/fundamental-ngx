import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';

@Component({
    selector: 'fdp-panel-actions',
    templateUrl: './panel-actions.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelActionsComponent {
    /** @hidden */
    @ViewChild(TemplateRef) contentTemplateRef: TemplateRef<any>;
}
