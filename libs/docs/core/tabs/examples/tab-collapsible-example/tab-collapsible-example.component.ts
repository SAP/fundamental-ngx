import { Component } from '@angular/core';

@Component({
    selector: 'fd-tab-collapsible-example',
    templateUrl: './tab-collapsible-example.component.html'
})
export class TabCollapsibleExampleComponent {
    tabs: { title: string; content: string }[] = [];

    constructor() {
        for (let i = 1; i <= 4; i++) {
            this.tabs.push({ title: `Tab ${i}`, content: `Content ${i}` });
        }
    }
}
