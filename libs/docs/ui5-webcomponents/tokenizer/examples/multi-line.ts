import { NgStyle } from '@angular/common';
import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Token } from '@fundamental-ngx/ui5-webcomponents/token';
import { Tokenizer } from '@fundamental-ngx/ui5-webcomponents/tokenizer';

@Component({
    selector: 'ui5-tokenizer-multi-line-sample',
    templateUrl: './multi-line.html',
    standalone: true,
    imports: [Tokenizer, Token, NgStyle]
})
export class TokenizerMultiLineSample {
    categories = signal([
        'Electronics',
        'Home & Garden',
        'Sports & Outdoors',
        'Books & Media',
        'Clothing & Accessories',
        'Food & Beverages',
        'Health & Beauty',
        'Toys & Games',
        'Automotive',
        'Office Supplies',
        'Pet Supplies',
        'Jewelry',
        'Baby Products',
        'Musical Instruments'
    ]);

    onSingleLineTokenDelete(event: UI5WrapperCustomEvent<Tokenizer, 'ui5TokenDelete'>): void {
        const tokens = event.detail.tokens;

        if (tokens) {
            tokens.forEach((token) => token.remove());
        }
    }

    onMultiLineTokenDelete(event: UI5WrapperCustomEvent<Tokenizer, 'ui5TokenDelete'>): void {
        const tokens = event.detail.tokens;

        if (tokens) {
            tokens.forEach((token) => token.remove());
        }
    }
}
