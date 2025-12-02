import { Component, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Menu } from '@fundamental-ngx/ui5-webcomponents/menu';
import { MenuItem } from '@fundamental-ngx/ui5-webcomponents/menu-item';

@Component({
    selector: 'ui5-menu-placement-sample',
    templateUrl: './placement-sample.html',
    standalone: true,
    imports: [Menu, MenuItem, Button]
})
export class PlacementSample {
    topMenuOpen = signal(false);
    bottomMenuOpen = signal(false);
    leftMenuOpen = signal(false);
    rightMenuOpen = signal(false);

    openTopMenu(): void {
        this.topMenuOpen.set(true);
    }

    openBottomMenu(): void {
        this.bottomMenuOpen.set(true);
    }

    openLeftMenu(): void {
        this.leftMenuOpen.set(true);
    }

    openRightMenu(): void {
        this.rightMenuOpen.set(true);
    }

    closeTopMenu(): void {
        this.topMenuOpen.set(false);
    }

    closeBottomMenu(): void {
        this.bottomMenuOpen.set(false);
    }

    closeLeftMenu(): void {
        this.leftMenuOpen.set(false);
    }

    closeRightMenu(): void {
        this.rightMenuOpen.set(false);
    }
}
