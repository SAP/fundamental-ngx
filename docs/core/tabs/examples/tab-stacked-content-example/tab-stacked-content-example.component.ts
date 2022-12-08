import { Component } from '@angular/core';

@Component({
    selector: 'fd-stacked-content-example',
    templateUrl: './tab-stacked-content-example.component.html'
})
export class TabStackedContentExampleComponent {
    tabs: { title: string; content: string }[] = [];

    constructor() {
        for (let i = 1; i <= 5; i++) {
            this.tabs.push({ title: `Tab ${i}`, content: `Content ${i}` });
        }
    }
}
