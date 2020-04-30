import { MenuItemDirective } from './menu-item.directive';
import { ElementRef } from '@angular/core';

export class MockElementRef extends ElementRef {
    constructor() {
        super('');
    }
}

describe('MenuItemDirective', () => {
    it('should create an instance', () => {
        const directive = new MenuItemDirective(new MockElementRef());
        expect(directive).toBeTruthy();
    });
});
