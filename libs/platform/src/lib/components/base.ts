import { Input, ChangeDetectorRef } from '@angular/core';
import { ContentDensity } from './form/form-control';

let randomId = 0;

/**
 * This class contains common properties used across components.
 * this can be extended to reduce the code duplication across components.
 * @hidden for form related Base , see BaseInput.
 */
export abstract class BaseComponent {
    protected defaultId: string = `fdp-id-${randomId++}`;
    protected _disabled: boolean = false;

    /** id for the Element */
    @Input()
    id: string = this.defaultId;

    /** name for the element */
    @Input()
    name: string;

    /** content Density of element. cozy | compact */
    @Input()
    contentDensity: ContentDensity = 'cozy';

    /** width of the element */
    @Input()
    width: string;

    /** disabled status of the element */
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(disabled: boolean) {
        this._disabled = disabled;
    }

    constructor(protected _cd: ChangeDetectorRef) { }
}
