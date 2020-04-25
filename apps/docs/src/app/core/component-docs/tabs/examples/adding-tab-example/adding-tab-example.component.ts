import { Component } from '@angular/core';

@Component({
    selector: 'fd-adding-tab-example',
    templateUrl: './adding-tab-example.component.html',
    styleUrls: ['./adding-tab-example.component.scss']
})
export class AddingTabExampleComponent {
    tabs = [
        { title: 'Tab 1', content: 'Content 1' },
        { title: 'Tab 2', content: 'Content 2' },
        { title: 'Tab 3', content: 'Content 3' }
    ];

    addTab(): void {
        if (this.tabs.length > 7) {
            return;
        }
        this.tabs.push({
            title: 'Tab ' + (this.tabs.length + 1),
            content: 'Content ' + (this.tabs.length + 1)
        });
    }

    removeTab(): void {
        if (this.tabs.length <= 1) {
            return;
        }
        this.tabs.pop();
    }
}
