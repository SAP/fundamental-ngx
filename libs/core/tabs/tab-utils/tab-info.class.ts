import { TemplateRef } from '@angular/core';

import { Nullable } from '@fundamental-ngx/cdk/utils';
import { TabItemState } from '../tab-item/tab-item.directive';
import { TabPanelComponent } from '../tab-panel/tab-panel.component';

/** @ignore */
export class TabInfo {
    /** Whether the tab is active */
    active: boolean;

    /** @ignore Width of the tab header */
    headerWidth: number;

    /** Corresponding tab panel */
    panel: TabPanelComponent;

    /** @ignore */
    constructor(tabPanel: TabPanelComponent) {
        this.panel = tabPanel;
        this.active = tabPanel.expanded;
    }

    /** Tab header title */
    get title(): Nullable<string> {
        return this.panel.title;
    }

    /** Whether the tab is disabled */
    get disabled(): boolean {
        return this.panel.disabled;
    }

    /** Whether the tab is tab header */
    get isHeader(): boolean {
        return this.panel.header;
    }

    /** @ignore */
    get id(): Nullable<string> {
        return this.panel.id;
    }

    /** @ignore */
    get ariaLabel(): Nullable<string> {
        return this.panel.ariaLabel;
    }

    /** @ignore */
    get ariaLabelledBy(): Nullable<string> {
        return this.panel.ariaLabelledBy;
    }

    /** @ignore */
    get tabState(): Nullable<TabItemState> {
        return this.panel.tabState;
    }

    /** @ignore */
    get titleTemplate(): TemplateRef<any> {
        return this.panel.titleTemplate;
    }

    /** @ignore */
    get count(): Nullable<string> {
        return this.panel.count;
    }

    /** @ignore */
    get glyph(): string {
        return this.panel.glyph;
    }

    /** @ignore */
    get forcedVisibility(): boolean {
        return this.panel._forcedVisibility;
    }

    /** @ignore */
    get panelId(): string {
        return this.panel._panelId;
    }
}
