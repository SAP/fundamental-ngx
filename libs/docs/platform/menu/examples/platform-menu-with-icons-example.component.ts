import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-platform-menu-with-icons-example',
    templateUrl: './platform-menu-with-icons-example.component.html',
    styleUrls: ['./platform-menu-example-styles.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlatformMenuWithIconsExampleComponent {
    item = '';

    onItemSelect(item: string): void {
        this.item = item;
    }
}
