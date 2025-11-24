import { Component, signal } from '@angular/core';
import { Token } from '@fundamental-ngx/ui5-webcomponents/token';
import { Tokenizer } from '@fundamental-ngx/ui5-webcomponents/tokenizer';

@Component({
    selector: 'ui5-tokenizer-readonly-sample',
    templateUrl: './readonly.html',
    standalone: true,
    imports: [Tokenizer, Token]
})
export class TokenizerReadonlySample {
    isReadonly = signal(true);

    selectedOptions = signal(['Option 1', 'Option 2', 'Option 3', 'Option 4']);
}
