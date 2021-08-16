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
import { ContentDensity } from '../form/form-control';

import { PanelConfig } from './panel.config';
import { PanelActionsComponent } from './panel-actions/panel-actions.component';
import { PanelContentComponent } from './panel-content/panel-content.component';

/** Panel change event instance */
export class PanelExpandChangeEvent {
    constructor(public source: PanelComponent, public payload: boolean) {}
}

let platformPanelTitleUniqueId = 0;

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
export class PanelComponent extends BaseComponent implements OnInit, OnChanges {
    /**
     * sets Panel title.
     */
    @Input()
    title: string;

    /**
     * Whether the Panel Content is expanded
     */
    @Input()
    expanded = true;

    /**
     * Whether the Panel is expandable
     */
    @Input()
    expandable = true;

    /**
     * content Density of element. 'cozy' | 'compact'
     */
    @Input()
    set contentDensity(contentDensity: ContentDensity) {
        this._contentDensity = contentDensity;
        this._isCompact = contentDensity === 'compact';
    }

    /**
     * ARIA label for button when the Panel is collapsed
     */
    @Input()
    expandLabel: string = this._panelConfig.expandLabel;

    /**
     * ARIA label for button when the Panel is expanded
     */
    @Input()
    collapseLabel: string = this._panelConfig.collapseLabel;

    /** Output event triggered when the Expand button is clicked */
    @Output()
    panelExpandChange: EventEmitter<PanelExpandChangeEvent> = new EventEmitter<PanelExpandChangeEvent>();

    /**
     * @hidden
     * Button label based on the current state
     */
    _expandAriaLabel: string;

    /** @hidden */
    @ContentChild(PanelActionsComponent)
    _panelActionsComponent: PanelActionsComponent;

    /** @hidden */
    @ContentChild(PanelContentComponent)
    _panelContentComponent: PanelContentComponent;

    /** @hidden */
    @ViewChild(PanelTitleDirective)
    _panelTitleDirective: PanelTitleDirective;

    /** @hidden */
    _contentDensity: ContentDensity = this._panelConfig.contentDensity;

    /** @hidden id of the title element */
    _titleId: string = 'fdp-panel-title-' + platformPanelTitleUniqueId++;

    /**
     * @hidden
     * Whether "contentDensity" is "compact"
     */
    _isCompact: boolean = this._contentDensity === 'compact';

    /** @hidden */
    constructor(protected _cd: ChangeDetectorRef, protected _panelConfig: PanelConfig) {
        super(_cd);
    }

    /** @hidden */
    ngOnInit(): void {
        this._calculateExpandAriaLabel();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.expanded) {
            this._calculateExpandAriaLabel();
        }
    }

    /** Handles expanded/collapsed event */
    onExpandedChange(expanded: boolean): void {
        this.expanded = expanded;
        const event = new PanelExpandChangeEvent(this, expanded);
        this.panelExpandChange.emit(event);
        this._calculateExpandAriaLabel();
    }

    /**
     * @hidden
     * Calculate expandAriaLabel based on panel state
     */
    private _calculateExpandAriaLabel(): void {
        this._expandAriaLabel = this.expanded ? this.collapseLabel : this.expandLabel;
    }
}
