import { Component, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { ResponsivePopover } from '@fundamental-ngx/ui5-webcomponents/responsive-popover';

// Import Fundamental Styles
import { NgStyle } from '@angular/common';
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

interface EventLog {
    event: string;
    timestamp: string;
}

@Component({
    selector: 'ui5-doc-responsive-popover-events-sample',
    templateUrl: './events-sample.html',
    standalone: true,
    imports: [ResponsivePopover, Button, NgStyle]
})
export class EventsSample {
    eventLog = signal<EventLog[]>([]);
    isOpen = signal(false);

    openPopover(): void {
        this.isOpen.set(true);
    }

    onBeforeOpen(_event: Event): void {
        this.logEvent('Before Open');
        // You can prevent opening by calling event.preventDefault()
        // event.preventDefault();
    }

    onOpen(): void {
        this.logEvent('Opened');
        this.isOpen.set(true);
    }

    onBeforeClose(_event: Event): void {
        this.logEvent('Before Close');
        // You can prevent closing by calling event.preventDefault()
        // event.preventDefault();
    }

    onClose(): void {
        this.logEvent('Closed');
        this.isOpen.set(false);
    }

    closePopover(): void {
        this.isOpen.set(false);
    }

    logEvent(eventName: string): void {
        const timestamp = new Date().toLocaleTimeString();
        this.eventLog.update((log) => [{ event: eventName, timestamp }, ...log].slice(0, 15));
    }

    clearLog(): void {
        this.eventLog.set([]);
    }
}
