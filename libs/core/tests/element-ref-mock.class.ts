import { ElementRef } from '@angular/core';

export class MockElementRef extends ElementRef {
    /** @hidden */
    constructor() {
        super(null);
    }
}
