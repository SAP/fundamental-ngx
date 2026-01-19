import { Component, signal } from '@angular/core';
import { Bar } from '@fundamental-ngx/ui5-webcomponents/bar';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { ResponsivePopover } from '@fundamental-ngx/ui5-webcomponents/responsive-popover';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-responsive-popover-header-footer-sample',
    templateUrl: './header-footer-sample.html',
    standalone: true,
    imports: [ResponsivePopover, Button, Bar, Title]
})
export class HeaderFooterSample {
    simpleOpen = signal(false);
    customOpen = signal(false);

    openSimplePopover(): void {
        this.simpleOpen.set(true);
    }

    openCustomPopover(): void {
        this.customOpen.set(true);
    }

    closeSimplePopover(): void {
        this.simpleOpen.set(false);
    }

    closeCustomPopover(): void {
        this.customOpen.set(false);
    }
}
