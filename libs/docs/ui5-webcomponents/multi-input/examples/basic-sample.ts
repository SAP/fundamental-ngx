import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { MultiInput } from '@fundamental-ngx/ui5-webcomponents/multi-input';
import { SuggestionItem } from '@fundamental-ngx/ui5-webcomponents/suggestion-item';
import { Token } from '@fundamental-ngx/ui5-webcomponents/token';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-multi-input-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [MultiInput, Token, SuggestionItem]
})
export class BasicSample {
    selectedTokens = signal<string[]>(['JavaScript', 'TypeScript']);
    inputValue = signal<string>('');

    suggestions = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Ruby', 'Go', 'Rust', 'PHP', 'Swift'];

    onTokenDelete(event: UI5WrapperCustomEvent<MultiInput, 'ui5TokenDelete'>): void {
        const deletedToken = event.detail.tokens[0].text;
        this.selectedTokens.update((tokens) => tokens.filter((t) => t !== deletedToken));
    }

    onInput(event: UI5WrapperCustomEvent<MultiInput, 'ui5Input'>): void {
        this.inputValue.set(event.currentTarget.value);
    }

    onSelectionChange(event: UI5WrapperCustomEvent<MultiInput, 'ui5SelectionChange'>): void {
        const selectedItem = event.detail.item;
        if (selectedItem) {
            const text = selectedItem.getAttribute('text') || '';
            if (!this.selectedTokens().includes(text)) {
                this.selectedTokens.update((tokens) => [...tokens, text]);
            }
            // Clear input after selection
            setTimeout(() => {
                this.inputValue.set('');
            }, 0);
        }
    }
}
