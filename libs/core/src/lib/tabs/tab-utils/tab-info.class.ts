import { TemplateRef } from '@angular/core';

import { TabPanelComponent } from '../tab-panel/tab-panel.component';
import { TabItemState } from '../tab-item/tab-item.directive';

/** @hidden */
export class TabInfo {

    /** @hidden */
    active: boolean;

    /** @hidden */
    headerWidth: number;

    /** @hidden */
    panel: TabPanelComponent;

    /** @hidden */
    constructor(tabPanel: TabPanelComponent) {
        this.panel = tabPanel;
        this.active = tabPanel.expanded;
    }

    get id(): string {
        return this.panel.id;
    }

    get ariaLabel(): string {
        return this.panel.ariaLabel;
    }

    get ariaLabelledBy(): string {
        return this.panel.ariaLabelledBy;
    }

    get disabled(): boolean {
        return this.panel.disabled;
    }

    get isHeader(): boolean {
        return this.panel.header;
    }

    get tabState(): TabItemState {
        return this.panel.tabState;
    }

    get titleTemplate(): TemplateRef<any> {
        return this.panel.titleTemplate;
    }

    get count(): string {
        return this.panel.count;
    }

    get title(): string {
        return this.panel.title;
    }

    get glyph(): string {
        return this.panel.glyph;
    }
}
