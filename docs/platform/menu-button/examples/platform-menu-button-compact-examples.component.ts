import { Component } from '@angular/core';

@Component({
    selector: 'fdp-platform-menu-button-compact-example',
    templateUrl: './platform-menu-button-compact-example.component.html'
})
export class PlatformMenuButtonCompactExampleComponent {
    basicMenuData: any[];
    item: string;

    onItemSelect(item: string): void {
        this.item = item;
    }
}
