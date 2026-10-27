import { Component, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Popover } from '@fundamental-ngx/ui5-webcomponents/popover';

@Component({
    selector: 'ui5-resizable-keyboard-popover-sample',
    templateUrl: './resizable-keyboard-sample.html',
    imports: [Button, Popover]
})
export class ResizableKeyboardPopoverSample {
    protected readonly _isOpen = signal(false);
}
