import { Component, signal } from '@angular/core';
import { Menu } from '@fundamental-ngx/ui5-webcomponents/menu';
import { MenuItem } from '@fundamental-ngx/ui5-webcomponents/menu-item';
import { SplitButton } from '@fundamental-ngx/ui5-webcomponents/split-button';

@Component({
    selector: 'ui5-doc-split-button-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [SplitButton, Menu, MenuItem]
})
export class BasicSample {
    isMenuOpen = signal<boolean>(false);

    onPrimaryClick(): void {
        console.log('Primary button clicked.');
    }

    onArrowClick(): void {
        console.log('Arrow button clicked.');
        this.isMenuOpen.update((open) => !open);
    }
}
