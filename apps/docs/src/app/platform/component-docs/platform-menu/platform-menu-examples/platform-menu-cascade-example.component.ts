import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-platform-menu-cascade-example',
    templateUrl: './platform-menu-cascade-example.component.html',
    styleUrls: ['./platform-menu-cascade-example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlatformMenuCascadeExampleComponent {
    public item = '';

    onItemSelect(item: string): void {
        this.item = item;
    }
}
