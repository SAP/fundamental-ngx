import {
    Component,
    Input,
    ChangeDetectorRef,
    Output,
    EventEmitter,
    ContentChild,
    ChangeDetectionStrategy
} from '@angular/core';

import { BaseComponent } from '../base';

import { PlatformPanelActionsComponent } from './panel-actions/panel-actions.component';
import { PlatformPanelContentComponent } from './panel-content/panel-content.component';

export class PanelExpandChangeEvent {
    constructor(
        public source: PlatformPanelComponent,
        public payload: boolean // true if "Expanded", false if "collapsed"
    ) {}
}

@Component({
    selector: 'fdp-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformPanelComponent extends BaseComponent {
    /**
     * sets Panel title.
     */
    @Input() title: string;
    /**
     * Whether the Panel Content is expanded
     */
    @Input() expanded: boolean = true;
    /**
     * Whether the Panel is expandable
     */
    @Input() expandable: boolean = true;
    /**
     * ARIA label for button when the Panel is collapsed
     */
    @Input() expandLabel: string = 'Expand Panel';
    /**
     * ARIA label for button when the Panel is expanded
     */
    @Input() collapseLabel: string = 'Collapse Panel';

    /** Output event triggered when the Expand button is clicked */
    @Output() panelExpandChange: EventEmitter<PanelExpandChangeEvent> = new EventEmitter();

    /** @hidden */
    @ContentChild(PlatformPanelActionsComponent) panelActions: PlatformPanelActionsComponent;
    /** @hidden */
    @ContentChild(PlatformPanelContentComponent) panelContent: PlatformPanelContentComponent;

    /** @hidden */
    get _expandAriaLabel(): string {
        return this.expanded ? this.collapseLabel : this.expandLabel;
    }

    constructor(protected _cd: ChangeDetectorRef) {
        super(_cd);
    }

    /** @hidden */
    _onExpandedChange(expanded: boolean) {
        const event = new PanelExpandChangeEvent(this, expanded);
        this.panelExpandChange.emit(event);
    }
}
