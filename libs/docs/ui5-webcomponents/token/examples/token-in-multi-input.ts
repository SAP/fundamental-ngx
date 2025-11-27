import { Component, signal, viewChild } from '@angular/core';
import { MultiInput } from '@fundamental-ngx/ui5-webcomponents';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Token } from '@fundamental-ngx/ui5-webcomponents/token';

@Component({
    selector: 'ui5-token-in-multi-input-sample',
    templateUrl: './token-in-multi-input.html',
    standalone: true,
    imports: [MultiInput, Token]
})
export class TokenInMultiInputSample {
    readonly availableTags = signal([
        { text: 'Frontend' },
        { text: 'Backend' },
        { text: 'Database' },
        { text: 'DevOps' },
        { text: 'Cloud' },
        { text: 'Security' }
    ]);

    readonly multiInput = viewChild<MultiInput>('multiInput');

    onInputChange(event: UI5WrapperCustomEvent<MultiInput, 'ui5Change'> | Event): void {
        const inputValue = event.target?.['value'];
        this.availableTags.update(() => [...this.availableTags(), { text: inputValue }]);

        const multiInput = this.multiInput();
        if (multiInput) {
            multiInput.element.value = '';
        }
    }

    onTokenDelete(event: UI5WrapperCustomEvent<MultiInput, 'ui5TokenDelete'>): void {
        const tokens = event.detail.tokens;
        if (tokens) {
            tokens.forEach((token) => token.remove());
        }
    }
}
