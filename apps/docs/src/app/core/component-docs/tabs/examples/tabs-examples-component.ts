import { Component } from '@angular/core';

@Component({
    selector: 'fd-tabs-example',
    templateUrl: './tabs-example.component.html'
})
export class TabsExampleComponent {}

@Component({
    selector: 'fd-tabs-navigation-mode-example',
    templateUrl: './tabs-navigation-mode-example.component.html'
})
export class TabsNavigationModeExampleComponent {}

@Component({
    selector: 'fd-tab-selection-example',
    templateUrl: './tab-selection-example.component.html',
    styleUrls: ['tab-selection-example.component.scss']
})
export class TabSelectionExampleComponent {
    selectedTab = 0;
}


