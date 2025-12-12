import { Component, signal } from '@angular/core';
import { Menu } from '@fundamental-ngx/ui5-webcomponents/menu';
import { MenuItem } from '@fundamental-ngx/ui5-webcomponents/menu-item';
import { SplitButton } from '@fundamental-ngx/ui5-webcomponents/split-button';

// Import the icons used in this example
import '@ui5/webcomponents-icons/dist/AllIcons.js';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-split-button-icon-sample',
    templateUrl: './icon-sample.html',
    standalone: true,
    imports: [SplitButton, MenuItem, Menu]
})
export class IconSample {
    isDownloadMenuOpen = signal<boolean>(false);
    isAddMenuOpen = signal<boolean>(false);

    onFileAction(action: string): void {
        console.log(`File action clicked: ${action}`);
    }

    onDownloadMenuOpen(): void {
        this.isDownloadMenuOpen.update((open) => !open);
    }

    onAddMenuOpen(): void {
        this.isAddMenuOpen.update((open) => !open);
    }
}
