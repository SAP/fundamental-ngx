import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { TabsModule } from '@fundamental-ngx/core/tabs';

@Component({
    selector: 'fd-tab-stacked-content-example',
    templateUrl: './tab-stacked-content-example.component.html',
    imports: [TabsModule, ButtonComponent]
})
export class TabStackedContentExampleComponent {
    tabs: { title: string; content: string }[] = [];

    showZeroTab = false;
    showSixthTab = false;

    constructor() {
        for (let i = 1; i <= 5; i++) {
            this.tabs.push({ title: `Tab ${i}`, content: `Content ${i}` });
        }
    }

    showZeroTabLater(): void {
        setTimeout(() => {
            this.showZeroTab = true;
        }, 2000);
    }
}
