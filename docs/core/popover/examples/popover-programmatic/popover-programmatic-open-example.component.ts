import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    PopoverBodyComponent,
    PopoverComponent,
    PopoverConfig,
    PopoverControlComponent
} from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-popover-programmatic-open-example',
    templateUrl: './popover-programmatic-open-example.component.html',
    styleUrls: ['popover-programmatic-open-example.component.scss'],
    imports: [
        PopoverComponent,
        PopoverControlComponent,
        AvatarComponent,
        PopoverBodyComponent,
        ButtonComponent,
        JsonPipe
    ]
})
export class PopoverProgrammaticOpenExampleComponent {
    /** Signal-based open state for two-way binding */
    isOpen = signal(false);

    /** Disabled state for the popover */
    isDisabled = signal(false);

    /** Config object example - can be used instead of individual inputs */
    popoverConfig: PopoverConfig = {
        placement: 'bottom-start',
        noArrow: false,
        closeOnEscapeKey: true,
        focusTrapped: true
    };

    /** Track open/close events */
    eventLog = signal<string[]>([]);

    /** Called before popover opens */
    onBeforeOpen(): void {
        this.addToLog('beforeOpen event fired');
    }

    /** Called when open state changes */
    onOpenChange(isOpen: boolean): void {
        this.addToLog(`isOpenChange: ${isOpen}`);
    }

    /** Toggle disabled state */
    toggleDisabled(): void {
        this.isDisabled.update((v) => !v);
        this.addToLog(`Popover ${this.isDisabled() ? 'disabled' : 'enabled'}`);
    }

    /** Clear event log */
    clearLog(): void {
        this.eventLog.set([]);
    }

    private addToLog(message: string): void {
        this.eventLog.update((log) => [...log, `${new Date().toLocaleTimeString()}: ${message}`]);
    }
}
