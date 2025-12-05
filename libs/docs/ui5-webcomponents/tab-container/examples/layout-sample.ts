import { Component, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Tab } from '@fundamental-ngx/ui5-webcomponents/tab';
import { TabContainer } from '@fundamental-ngx/ui5-webcomponents/tab-container';
import { TabLayout } from '@fundamental-ngx/ui5-webcomponents/types';

// Import icons
import '@ui5/webcomponents-icons/dist/detail-view.js';
import '@ui5/webcomponents-icons/dist/home.js';
import '@ui5/webcomponents-icons/dist/settings.js';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-tab-container-layout-sample',
    templateUrl: './layout-sample.html',
    standalone: true,
    imports: [TabContainer, Tab, Button]
})
export class LayoutSample {
    tabLayout = signal<TabLayout>(TabLayout.Standard);

    toggleLayout(): void {
        this.tabLayout.set(this.tabLayout() === TabLayout.Standard ? TabLayout.Inline : TabLayout.Standard);
    }
}
