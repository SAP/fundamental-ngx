import { Component } from '@angular/core';

@Component({
    selector: 'fd-collapsible-example',
    templateUrl: './tab-collapsible-example.component.html'
})
export class TabCollapsibleExampleComponent {
    tabs: { title: string, content: string }[] = [];

    constructor() {
        for (let i = 1; i <= 15; i++) {
            this.tabs.push({ title: `Tab ${i}`, content: `Content ${i}` });
        }
    }
}
