import { Component } from '@angular/core';

@Component({
    selector: 'fdp-platform-menu-button-example',
    templateUrl: './platform-menu-button-example.component.html',
})
export class PlatformMenuButtonExampleComponent {
    basicMenuData: any[] = [];
    item = '';
    userDefined(event: Event) {}
    onItemSelect(item: string) {
        this.item = item;
    }
}