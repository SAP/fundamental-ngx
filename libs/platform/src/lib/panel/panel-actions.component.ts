import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-panel-actions',
    template: '<ng-content></ng-content>',
    styles: [
        `
            fdp-panel-actions > * {
                margin-left: 0.5rem;
            }

            [dir='rtl'] fdp-panel-actions > * {
                margin-left: 0;
                margin-right: 0.5rem;
            }
        `
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelActionsComponent {}
