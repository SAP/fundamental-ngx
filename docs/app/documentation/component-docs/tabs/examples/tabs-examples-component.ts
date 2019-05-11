import { Component } from '@angular/core';

@Component({
    selector: 'fd-tabs-example',
    templateUrl: './tabs-example.component.html'
})
export class TabsExampleComponent {}

@Component({
    selector: 'fd-tab-selection-example',
    templateUrl: './tab-selection-example.component.html',
    styles: [`
        .fd-button {
            margin-right: 16px;
        }
    `]
})
export class TabSelectionExampleComponent {
    selectedTab = 0;
}
