import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

let platformPanelContentUniqueId = 0;

@Component({
    selector: 'fdp-panel-content',
    template: `<ng-content></ng-content>`,
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

    /** Id of the host element. */
    @Input()
    @HostBinding('attr.id')
    id: string = 'fdp-panel-content-' + platformPanelContentUniqueId++;
}
