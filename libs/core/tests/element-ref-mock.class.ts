import { ElementRef } from '@angular/core';

export class MockElementRef extends ElementRef {
    /** @ignore */
    constructor() {
        super(null);
    }
}
