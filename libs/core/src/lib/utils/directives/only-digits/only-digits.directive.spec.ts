import { MockElementRef } from '../../../tests';
import { OnlyDigitsDirective } from './only-digits.directive';

describe('OnlyDigitsDirective', () => {
    it('should create an instance', () => {
        const directive = new OnlyDigitsDirective(new MockElementRef());
        expect(directive).toBeTruthy();
    });
});
