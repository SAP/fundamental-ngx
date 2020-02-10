import { Directive } from '@angular/core';

@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tokenizer-input]',
    host: {
        class: 'fd-tokenizer__input'
    }
})
export class TokenizerInputDirective {}
