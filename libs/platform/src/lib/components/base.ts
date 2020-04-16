import { Input, ChangeDetectorRef } from '@angular/core';
import { InputSize } from './form/form-control';

let randomId = 0;

/**
 * This class contains common properties used across components. 
 * this can be extended to reduce the code duplication across components.
 * @hidden for form related Base , see BaseInput.
 */
export class BaseComponent {
    protected defaultId: string = `fdp-id-${randomId++}`;
    protected _disabled: boolean;

    @Input()
    id: string = this.defaultId;

    @Input()
    name: string;

    @Input()
    placeholder: string;

    @Input()
    contentDensity: InputSize = 'cozy';

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(disabled: boolean) {
        this._disabled = disabled;
    }

    constructor(protected _cd: ChangeDetectorRef) {}

}
