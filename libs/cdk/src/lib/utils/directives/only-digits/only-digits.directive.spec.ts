import { ElementRef } from '@angular/core';
import { OnlyDigitsDirective } from './only-digits.directive';

export class MockElementRef extends ElementRef {
    /** @hidden */
    constructor() {
        super(null);
    }
}

describe('OnlyDigitsDirective', () => {
    it('should create an instance', () => {
        const directive = new OnlyDigitsDirective(new MockElementRef());
        expect(directive).toBeTruthy();
    });
});
