import {
    Component,
    Input,
    ChangeDetectorRef,
    Output,
    EventEmitter,
    ContentChild,
    ChangeDetectionStrategy,
    ViewChild,
    OnInit,
    OnChanges,
    SimpleChanges
} from '@angular/core';

import { PanelTitleDirective } from '@fundamental-ngx/core';

import { BaseComponent } from '../base';

import { PlatformPanelConfig } from './panel.config';
import { PlatformPanelActionsComponent } from './panel-actions/panel-actions.component';
import { PlatformPanelContentComponent } from './panel-content/panel-content.component';

/** Panel change event instance */
export class PanelExpandChangeEvent {
    constructor(public source: PlatformPanelComponent, public payload: boolean) {}
}

/**
 * Fundamental Panel component
 *
 * ```html
 * <fdp-panel title="Panel Header">
 *     <fdp-panel-content>
 *        Panel Content
 *     </fdp-panel-content>
 * </fdp-panel>
 * ```
 *
 * */
@Component({
    selector: 'fdp-panel',
    templateUrl: './panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformPanelComponent extends BaseComponent implements OnInit, OnChanges {
    /**
     * sets Panel title.
     */
    @Input()
    title: string;

    /**
     * Whether the Panel Content is expanded
     */
    @Input()
    expanded: boolean = true;

    /**
     * Whether the Panel is expandable
     */
    @Input()
    expandable: boolean = true;

    /**
     * ARIA label for button when the Panel is collapsed
     */
    @Input()
    expandLabel: string;

    /**
     * ARIA label for button when the Panel is expanded
     */
    @Input()
    collapseLabel: string;

    /** Output event triggered when the Expand button is clicked */
    @Output()
    panelExpandChange: EventEmitter<PanelExpandChangeEvent> = new EventEmitter();

    /**
     *  Button label based on the current state
     */
    expandAriaLabel: string;

    /** @hidden */
    _expanded: boolean = true;

    /** @hidden */
    @ContentChild(PlatformPanelActionsComponent)
    panelActionsComponent: PlatformPanelActionsComponent;

    /** @hidden */
    @ContentChild(PlatformPanelContentComponent)
    panelContentComponent: PlatformPanelContentComponent;

    /** @hidden */
    @ViewChild(PanelTitleDirective)
    panelTitleDirective: PanelTitleDirective;

    /** @hidden */
    constructor(protected _cd: ChangeDetectorRef, panelConfig: PlatformPanelConfig) {
        super(_cd);

        /* Initialize values by default options */
        this.contentDensity = panelConfig.contentDensity;
        this.expandLabel = panelConfig.expandLabel;
        this.collapseLabel = panelConfig.collapseLabel;
    }

    /** @hidden */
    ngOnInit() {
        this._calculateExpandAriaLabel();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges) {
        if (changes.expanded) {
            this._calculateExpandAriaLabel();
        }
    }

    /**
     *  Handles expanded/collapsed event
     */
    onExpandedChange(expanded: boolean) {
        this.expanded = expanded;
        const event = new PanelExpandChangeEvent(this, expanded);
        this.panelExpandChange.emit(event);
        this._calculateExpandAriaLabel();
    }

    /**
     * @hidden
     * Calculate expandAriaLabel based on panel state
     */
    private _calculateExpandAriaLabel() {
        this.expandAriaLabel = this.expanded ? this.collapseLabel : this.expandLabel;
    }
}
