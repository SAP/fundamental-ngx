import { Component, signal } from '@angular/core';
import { Token } from '@fundamental-ngx/ui5-webcomponents/token';
import { Tokenizer } from '@fundamental-ngx/ui5-webcomponents/tokenizer';

@Component({
    selector: 'ui5-tokenizer-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [Tokenizer, Token]
})
export class TokenizerBasicSample {
    tokens = signal([
        { id: 1, text: 'Product A', value: 'product-a' },
        { id: 2, text: 'Product B', value: 'product-b' },
        { id: 3, text: 'Product C', value: 'product-c' },
        { id: 4, text: 'Product D', value: 'product-d' }
    ]);

    onTokenDelete(event: any): void {
        const tokens = event.detail?.tokens;

        if (tokens) {
            tokens.forEach((token) => token.remove());
        }
    }
}
