import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Option } from '@fundamental-ngx/ui5-webcomponents/option';
import { Select } from '@fundamental-ngx/ui5-webcomponents/select';
import { Tab } from '@fundamental-ngx/ui5-webcomponents/tab';
import { TabContainer } from '@fundamental-ngx/ui5-webcomponents/tab-container';
import { BackgroundDesign } from '@fundamental-ngx/ui5-webcomponents/types';

// Import icons
import '@ui5/webcomponents-icons/dist/bar-chart.js';
import '@ui5/webcomponents-icons/dist/document.js';
import '@ui5/webcomponents-icons/dist/home.js';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-tab-container-background-design-sample',
    templateUrl: './background-design-sample.html',
    standalone: true,
    imports: [TabContainer, Tab, Select, Option, Label]
})
export class BackgroundDesignSample {
    design = signal(BackgroundDesign);
    headerDesign = signal<BackgroundDesign>(BackgroundDesign.Solid);
    contentDesign = signal<BackgroundDesign>(BackgroundDesign.Solid);

    onHeaderDesignChange(event: UI5WrapperCustomEvent<Select, 'ui5Change'>): void {
        this.headerDesign.set(event.currentTarget.value as BackgroundDesign);
    }

    onContentDesignChange(event: UI5WrapperCustomEvent<Select, 'ui5Change'>): void {
        this.contentDesign.set(event.currentTarget.value as BackgroundDesign);
    }
}
