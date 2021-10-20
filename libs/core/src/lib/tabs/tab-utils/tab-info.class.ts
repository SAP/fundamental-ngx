import { TemplateRef } from '@angular/core';

import { TabPanelComponent } from '../tab-panel/tab-panel.component';
import { TabItemState } from '../tab-item/tab-item.directive';

/** @hidden */
export class TabInfo {
    /** Whether the tab is active */
    active: boolean;

    /** @hidden Width of the tab header */
    headerWidth: number;

    /** Corresponding tab panel */
    panel: TabPanelComponent;

    /** @hidden */
    constructor(tabPanel: TabPanelComponent) {
        this.panel = tabPanel;
        this.active = tabPanel.expanded;
    }

    /** Tab header title */
    get title(): string {
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

    /** @hidden */
    get id(): string {
        return this.panel.id;
    }

    /** @hidden */
    get ariaLabel(): string {
        return this.panel.ariaLabel;
    }

    /** @hidden */
    get ariaLabelledBy(): string {
        return this.panel.ariaLabelledBy;
    }

    /** @hidden */
    get tabState(): TabItemState {
        return this.panel.tabState;
    }

    /** @hidden */
    get titleTemplate(): TemplateRef<any> {
        return this.panel.titleTemplate;
    }

    /** @hidden */
    get count(): string {
        return this.panel.count;
    }

    /** @hidden */
    get glyph(): string {
        return this.panel.glyph;
    }
}
