import { Component } from '@angular/core';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { TextComponent } from '@fundamental-ngx/core/text';

@Component({
    selector: 'fd-tab-collapsible-overflow-example',
    templateUrl: './tab-collapsible-overflow-example.component.html',
    imports: [TabsModule, TextComponent]
})
export class TabCollapsibleOverflowExampleComponent {
    tabs: { title: string; content: string }[] = [];

    constructor() {
        for (let i = 1; i <= 15; i++) {
            this.tabs.push({ title: `Tab ${i}`, content: `Content ${i}` });
        }
    }
}
