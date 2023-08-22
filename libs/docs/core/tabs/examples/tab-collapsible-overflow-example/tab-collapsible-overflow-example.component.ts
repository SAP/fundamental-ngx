import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { FormLabelModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-collapsible-overflow-example',
    templateUrl: './tab-collapsible-overflow-example.component.html',
    standalone: true,
    imports: [FormLabelModule, TabsModule, NgFor]
})
export class TabCollapsibleOverflowExampleComponent {
    tabs: { title: string; content: string }[] = [];

    constructor() {
        for (let i = 1; i <= 15; i++) {
            this.tabs.push({ title: `Tab ${i}`, content: `Content ${i}` });
        }
    }
}
