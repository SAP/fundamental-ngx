import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-stacked-content-example',
    templateUrl: './tab-stacked-content-example.component.html',
    encapsulation: ViewEncapsulation.None,
    styles: [
        '.sticky-tab-bar { height: 250px; overflow-y: scroll; }',
        '.sticky-tab-bar .fd-tabs { position: sticky; top: 0; }',
        '.content-container { height: 100px; border: 1px dashed grey; padding: 0.5rem; }'
    ]
})
export class TabStackedContentExampleComponent {
    tabs: { title: string, content: string }[] = [];

    constructor() {
        for (let i = 1; i <= 5; i++) {
            this.tabs.push({ title: `Tab ${i}`, content: `Content ${i}` });
        }
    }
}
