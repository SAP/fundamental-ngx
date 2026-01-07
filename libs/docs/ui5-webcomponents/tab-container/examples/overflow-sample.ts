import { Component, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Tab } from '@fundamental-ngx/ui5-webcomponents/tab';
import { TabContainer } from '@fundamental-ngx/ui5-webcomponents/tab-container';
import { OverflowMode } from '@fundamental-ngx/ui5-webcomponents/types';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-tab-container-overflow-sample',
    templateUrl: './overflow-sample.html',
    standalone: true,
    imports: [TabContainer, Tab, Button]
})
export class OverflowSample {
    overflowMode = signal<OverflowMode>(OverflowMode.End);
    tabContents = signal(Array.from({ length: 10 }, (_, i) => `Content for tab ${i + 1}`));

    toggleOverflow(): void {
        this.overflowMode.set(this.overflowMode() === OverflowMode.End ? OverflowMode.StartAndEnd : OverflowMode.End);
    }
}
