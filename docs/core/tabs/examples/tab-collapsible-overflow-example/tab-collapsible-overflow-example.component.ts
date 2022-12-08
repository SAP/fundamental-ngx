import { Component } from '@angular/core';

@Component({
    selector: 'fd-collapsible-overflow-example',
    templateUrl: './tab-collapsible-overflow-example.component.html'
})
export class TabCollapsibleOverflowExampleComponent {
    tabs: { title: string; content: string }[] = [];

    constructor() {
        for (let i = 1; i <= 15; i++) {
            this.tabs.push({ title: `Tab ${i}`, content: `Content ${i}` });
        }
    }
}
