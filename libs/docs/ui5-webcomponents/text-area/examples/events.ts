import { Component, signal } from '@angular/core';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';
import { TextArea } from '@fundamental-ngx/ui5-webcomponents/text-area';

// Import Fundamental Styles
import 'fundamental-styles/dist/form-item.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-textarea-events-sample',
    templateUrl: './events.html',
    standalone: true,
    imports: [TextArea, Text, Label]
})
export class TextAreaEventsSample {
    readonly textareaValue = signal('Try typing, selecting text, or scrolling in this textarea...');
    readonly eventLog = signal<string[]>([]);

    private addEvent(eventType: string, detail?: any): void {
        const timestamp = new Date().toLocaleTimeString();
        const eventDescription = detail
            ? `${timestamp} - ${eventType}: ${JSON.stringify(detail)}`
            : `${timestamp} - ${eventType}`;

        this.eventLog.update((log) => [eventDescription, ...log].slice(0, 10)); // Keep last 10 events
    }

    onTextareaChange(event: CustomEvent): void {
        this.textareaValue.set((event.target as any).value);
        this.addEvent('ui5Change', { value: (event.target as any).value });
    }

    onTextareaInput(event: CustomEvent): void {
        this.addEvent('ui5Input', { value: (event.target as any).value });
    }

    onTextareaSelect(): void {
        this.addEvent('ui5Select');
    }

    onTextareaScroll(): void {
        this.addEvent('ui5Scroll');
    }
}
