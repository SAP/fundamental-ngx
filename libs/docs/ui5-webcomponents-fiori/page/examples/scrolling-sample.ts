import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base/types';
import { Page } from '@fundamental-ngx/ui5-webcomponents-fiori/page';
import { Bar } from '@fundamental-ngx/ui5-webcomponents/bar';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Switch } from '@fundamental-ngx/ui5-webcomponents/switch';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-page-scrolling-sample',
    templateUrl: './scrolling-sample.html',
    standalone: true,
    imports: [Page, Bar, Switch, Label]
})
export class ScrollingSample {
    noScrolling = signal<boolean>(false);

    onScrollingToggle(event: UI5WrapperCustomEvent<Switch, 'ui5Change'>): void {
        this.noScrolling.set(event.currentTarget.checked);
    }
}
