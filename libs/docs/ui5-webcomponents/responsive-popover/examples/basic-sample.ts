import { Component, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { List } from '@fundamental-ngx/ui5-webcomponents/list';
import { ListItemStandard } from '@fundamental-ngx/ui5-webcomponents/list-item-standard';
import { ResponsivePopover } from '@fundamental-ngx/ui5-webcomponents/responsive-popover';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-responsive-popover-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [ResponsivePopover, Button, List, ListItemStandard]
})
export class BasicSample {
    isOpen = signal(false);

    openPopover(): void {
        this.isOpen.set(true);
    }

    closePopover(): void {
        this.isOpen.set(false);
    }
}
