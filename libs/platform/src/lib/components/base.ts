import { Input, ChangeDetectorRef, Directive } from '@angular/core';
import { ContentDensity } from './form/form-control';

let randomId = 0;

/**
 * This class contains common properties used across components.
 * this can be extended to reduce the code duplication across components.
 * @hidden for form related Base , see BaseInput.
 */
@Directive()
export abstract class BaseComponent {
    protected defaultId = `fdp-id-${randomId++}`;
    protected _disabled = false;

    /** Sets the `aria-label` attribute to the element. */
    @Input()
    ariaLabel = null;

    /** Sets the `aria-labelledby` attribute to the element. */
    @Input()
    ariaLabelledBy = null;

    /** Sets the `aria-describedby` attribute to the element. */
    @Input()
    ariaDescribedBy: string;

    /** id for the Element */
    @Input()
    id: string = this.defaultId;

    /** name for the element */
    @Input()
    name: string;

    /** content Density of element. cozy | compact */
    @Input()
    set contentDensity(contentDensity: ContentDensity) {
        this._contentDensity = contentDensity;
    }
    get contentDensity(): ContentDensity {
        return this._contentDensity;
    }
    /** @hidden - Avoiding private property name collision */
    _contentDensity: ContentDensity;

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

    constructor(protected _cd: ChangeDetectorRef) {}

    /**
     * @hidden
     * For internal usage only
     *
     * Since all components use OnPush strategy in the fundamental lib
     * it's tricky to update a child input directly from a parent component class
     *
     */
    markForCheck(): void {
        this._cd.markForCheck();
    }

    /**
     * @hidden
     * For internal usage only
     *
     * Since all components use OnPush strategy in the fundamental lib
     * it's tricky to update a child input directly from a parent component class
     *
     */
    detectChanges(): void {
        this._cd.detectChanges();
    }
}
