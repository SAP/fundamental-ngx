import { Component } from '@angular/core';
import { TabsModule } from '@fundamental-ngx/core/tabs';

@Component({
    selector: 'fd-tab-collapsible-example',
    templateUrl: './tab-collapsible-example.component.html',
    imports: [TabsModule]
})
export class TabCollapsibleExampleComponent {
    tabs: { title: string; content: string }[] = [];

    constructor() {
        for (let i = 1; i <= 4; i++) {
            this.tabs.push({ title: `Tab ${i}`, content: `Content ${i}` });
        }
    }
}
