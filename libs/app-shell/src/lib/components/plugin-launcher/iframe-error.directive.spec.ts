/* tslint:disable:no-unused-variable */

import { ElementRef } from '@angular/core';
import { IframeErrorDirective } from './iframe-error.directive';

class MockElementRef extends ElementRef {
    nativeElement = document.createElement('iframe');
}

describe('Directive: IframeError', () => {
    it('should create', () => {
        const directive = new IframeErrorDirective(
            new MockElementRef(null)
        );
        expect(directive).toBeDefined();
    });
});
