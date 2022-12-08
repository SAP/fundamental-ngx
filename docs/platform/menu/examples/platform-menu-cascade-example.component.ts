import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-platform-menu-cascade-example',
    templateUrl: './platform-menu-cascade-example.component.html',
    styleUrls: ['./platform-menu-example-styles.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlatformMenuCascadeExampleComponent {
    item = '';

    onItemSelect(item: string): void {
        this.item = item;
    }
}
