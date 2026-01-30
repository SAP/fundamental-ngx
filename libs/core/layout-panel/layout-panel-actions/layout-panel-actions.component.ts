import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'fd-layout-panel-actions',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-layout-panel__actions'
    }
})
export class LayoutPanelActionsComponent {}
