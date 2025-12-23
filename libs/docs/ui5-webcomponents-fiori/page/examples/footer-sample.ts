import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Page } from '@fundamental-ngx/ui5-webcomponents-fiori/page';
import { Bar } from '@fundamental-ngx/ui5-webcomponents/bar';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { CheckBox } from '@fundamental-ngx/ui5-webcomponents/check-box';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

// Import the icons used in this example
import '@ui5/webcomponents-icons/dist/action-settings.js';
import '@ui5/webcomponents-icons/dist/home.js';

@Component({
    selector: 'ui5-doc-page-footer-sample',
    templateUrl: './footer-sample.html',
    standalone: true,
    imports: [Page, Bar, Title, Button, CheckBox]
})
export class FooterSample {
    hideFooter = signal<boolean>(false);
    fixedFooter = signal<boolean>(false);

    onHideFooterToggle(event: UI5WrapperCustomEvent<CheckBox, 'ui5Change'>): void {
        this.hideFooter.set(event.currentTarget.checked);
    }

    onFixedFooterToggle(event: UI5WrapperCustomEvent<CheckBox, 'ui5Change'>): void {
        this.fixedFooter.set(event.currentTarget.checked);
    }
}
