import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tokenizer-input]'
})
export class TokenizerInputDirective implements OnInit {

    /** @hidden */
    ngOnInit(): void {
        this._elementRef.nativeElement.classList.add('fd-tokenizer__input');
    }

    /** @hidden */
    constructor(
        private _elementRef: ElementRef
    ) { }

}
