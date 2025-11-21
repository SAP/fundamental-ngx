import { Component, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Token } from '@fundamental-ngx/ui5-webcomponents/token';
import { Tokenizer } from '@fundamental-ngx/ui5-webcomponents/tokenizer';

@Component({
    selector: 'ui5-tokenizer-clear-all-sample',
    templateUrl: './clear-all.html',
    standalone: true,
    imports: [Tokenizer, Token, Button]
})
export class TokenizerClearAllSample {
    tags = signal([
        { id: 1, text: 'JavaScript' },
        { id: 2, text: 'TypeScript' },
        { id: 3, text: 'Angular' },
        { id: 4, text: 'React' },
        { id: 5, text: 'Vue' },
        { id: 6, text: 'Node.js' },
        { id: 7, text: 'Python' },
        { id: 8, text: 'Java' }
    ]);

    /*
     * This method is fired upon deleting a single token as well as when "Clear All" button is clicked.
     * The difference between the two is the number of elements in event.detail.tokens
     */
    onTokenDelete(event: CustomEvent): void {
        const tokenElements = event.detail.tokens;
        tokenElements.forEach((token) => token.remove());
    }
}
