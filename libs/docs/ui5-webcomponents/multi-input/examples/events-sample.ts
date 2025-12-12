import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { MultiInput } from '@fundamental-ngx/ui5-webcomponents/multi-input';
import { SuggestionItem } from '@fundamental-ngx/ui5-webcomponents/suggestion-item';
import { Token } from '@fundamental-ngx/ui5-webcomponents/token';

// Import the icons used in this example
import '@ui5/webcomponents-icons/dist/AllIcons.js';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

interface EventLog {
    timestamp: string;
    event: string;
    detail: string;
}

@Component({
    selector: 'ui5-doc-multi-input-events-sample',
    templateUrl: './events-sample.html',
    standalone: true,
    imports: [MultiInput, Token, SuggestionItem]
})
export class EventsSample {
    eventLog = signal<EventLog[]>([]);
    tokens = signal<string[]>(['Angular', 'React']);
    inputValue = signal<string>('');

    frameworks = ['Angular', 'React', 'Vue', 'Svelte', 'Ember', 'Backbone', 'Knockout'];

    onInput(event: UI5WrapperCustomEvent<MultiInput, 'ui5Input'>): void {
        const value = event.currentTarget.value;
        this.inputValue.set(value);
        this.addEvent('ui5Input', `Input value: "${value}"`);
    }

    onChange(_event: UI5WrapperCustomEvent<MultiInput, 'ui5Change'>): void {
        this.addEvent('ui5Change', 'Input operation finished');
    }

    onTokenDelete(event: UI5WrapperCustomEvent<MultiInput, 'ui5TokenDelete'>): void {
        const deletedToken = event.detail.tokens[0].text;
        this.tokens.update((tokens) => tokens.filter((t) => t !== deletedToken));
        this.addEvent('ui5TokenDelete', `Token deleted: "${deletedToken}"`);
    }

    onSelectionChange(event: UI5WrapperCustomEvent<MultiInput, 'ui5SelectionChange'>): void {
        const selectedItem = event.detail.item;
        if (selectedItem) {
            const text = selectedItem.getAttribute('text') || '';
            this.addEvent('ui5SelectionChange', `Selected: "${text}"`);

            if (!this.tokens().includes(text)) {
                this.tokens.update((tokens) => [...tokens, text]);
            }

            setTimeout(() => {
                this.inputValue.set('');
            }, 0);
        }
    }

    onOpen(): void {
        this.addEvent('ui5Open', 'Suggestions picker opened');
    }

    onClose(): void {
        this.addEvent('ui5Close', 'Suggestions picker closed');
    }

    clearLog(): void {
        this.eventLog.set([]);
    }

    private addEvent(event: string, detail: string): void {
        const timestamp = new Date().toLocaleTimeString();
        this.eventLog.update((log) => [{ timestamp, event, detail }, ...log].slice(0, 10));
    }
}
