import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { TabsModule } from '@fundamental-ngx/core/tabs';

@Component({
    selector: 'fd-stacked-content-example',
    templateUrl: './tab-stacked-content-example.component.html',
    standalone: true,
    imports: [TabsModule, NgFor]
})
export class TabStackedContentExampleComponent {
    tabs: { title: string; content: string }[] = [];

    constructor() {
        for (let i = 1; i <= 5; i++) {
            this.tabs.push({ title: `Tab ${i}`, content: `Content ${i}` });
        }
    }
}
