import { Component } from '@angular/core';

@Component({
    selector: 'fdp-platform-menu-button-compact-example',
    templateUrl: './platform-menu-button-compact-example.component.html',
})
export class PlatformMenuButtonCompactExampleComponent {
    basicMenuData: any[] = [];
    item = '';
    userDefined(event: Event) {}
    onItemSelect(item: string) {
        this.item = item;
    }
}
