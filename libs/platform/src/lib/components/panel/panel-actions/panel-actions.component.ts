import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-panel-actions',
    templateUrl: './panel-actions.component.html',
    styleUrls: ['./panel-actions.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformPanelActionsComponent {
    constructor() {}
}
