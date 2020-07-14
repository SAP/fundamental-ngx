import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-panel-content',
    templateUrl: './panel-content.component.html',
    styleUrls: ['./panel-content.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformPanelContentComponent {
    constructor() {}
}
