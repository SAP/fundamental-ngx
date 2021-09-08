import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-platform-menu-x-position-example',
    templateUrl: './platform-menu-x-position-example.component.html',
    styleUrls: ['./platform-menu-x-position-example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlatformMenuXPositionExampleComponent {
    public item = '';

    onItemSelect(item: string): void {
        this.item = item;
    }
}
