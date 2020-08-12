import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'fdp-panel-content',
    templateUrl: './panel-content.component.html',
    styleUrls: ['./panel-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelContentComponent {
    /**
     * @harmful Potentially bad approach to hardcode css related properties
     * Custom height of the content container.
     */
    @Input()
    contentHeight: string;
}
