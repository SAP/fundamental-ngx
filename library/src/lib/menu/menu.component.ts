import { AfterContentInit, Component, ContentChild } from '@angular/core';
import { MenuAddonComponent } from './menu-addon.component';

@Component({
    selector: 'fd-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent implements AfterContentInit {
    hasAddon: boolean = false;

    @ContentChild(MenuAddonComponent) menuAddon: MenuAddonComponent;

    ngAfterContentInit() {
        if (this.menuAddon) {
            this.hasAddon = true;
        }
    }

}
