import { Component, signal } from '@angular/core';
import { Button, Toast } from '@fundamental-ngx/ui5-webcomponents';

@Component({
    selector: 'ui5-toast-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [Toast, Button]
})
export class ToastBasicSample {
    readonly isToastOpen = signal(false);
    readonly toastMessage = signal('This is a basic toast notification!');

    showToast(): void {
        this.isToastOpen.set(true);
    }

    onToastClose(): void {
        this.isToastOpen.set(false);
    }
}
