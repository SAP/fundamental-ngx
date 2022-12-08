import { Component } from '@angular/core';

@Component({
    selector: 'fdp-platform-menu-button-cozy-example',
    templateUrl: './platform-menu-button-cozy-example.component.html'
})
export class PlatformMenuButtonCozyExampleComponent {
    basicMenuData: any[];
    item: string;

    onItemSelect(item: string): void {
        this.item = item;
    }
}
