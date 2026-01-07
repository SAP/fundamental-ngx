import { Component, signal } from '@angular/core';
import { Button, Label, Option, Select, Toast } from '@fundamental-ngx/ui5-webcomponents';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { ToastPlacement } from '@fundamental-ngx/ui5-webcomponents/types';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-toast-placement-sample',
    templateUrl: './placement.html',
    standalone: true,
    imports: [Toast, Button, Select, Option, Label]
})
export class ToastPlacementSample {
    readonly placements = Array.from<ToastPlacement>(Object.values(ToastPlacement));

    readonly selectedPlacement = signal(ToastPlacement.BottomCenter);
    readonly isToastOpen = signal(false);
    readonly toastMessage = signal('Toast notification with custom placement');

    onPlacementChange(event: UI5WrapperCustomEvent<Select, 'ui5Change'>): void {
        const selectedOption = event.detail?.selectedOption;
        if (selectedOption) {
            this.selectedPlacement.set(
                (selectedOption.getAttribute('value') as ToastPlacement) || ToastPlacement.BottomCenter
            );
        }
    }

    showToast(): void {
        this.isToastOpen.set(true);
    }

    onToastClose(): void {
        this.isToastOpen.set(false);
    }
}
