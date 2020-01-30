import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, ElementRef, Input, AfterViewInit } from '@angular/core';
import { CssClassBuilder, applyCssClass } from '../../utils/public_api';

/**
 * Represents a form group element.
 *
 * ```html
 * <fd-form-group>
 *     <div fd-form-item [isCheck]="true">
 *         <input fd-form-control type="radio" checked>
 *         <fd-form-label>Option One</fd-form-label>
 *     </div>
 * </fd-form-group>
 * ```
 */
@Component({
    selector: 'fd-form-group',
    templateUrl: './form-group.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./form-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormGroupComponent implements CssClassBuilder, AfterViewInit {
    class: string;
    /** @hidden */
    @HostBinding('class.fd-form-group')
    fdFormGroupClass: boolean = true;

    private _isInline: boolean = false;
    /** Determines if form items should be displayed inline or not
     * Default value is set to false;
     */
    @Input() set isInline(inline: boolean) {
        this._isInline = inline;
        this.buildComponentCssClass();
    }

    /** @hidden */
    constructor(private _elementRef: ElementRef) {

    }

    /** @hidden */
    ngAfterViewInit() {
        this.buildComponentCssClass();
    }

    /** This method is responsible for building a css class based on current state
     *  It is implementation of CssClassBuilder interface and
     *  should be used with @applyCssClass decorator
     */
    @applyCssClass
    buildComponentCssClass(): string {
        return this._isInline ? 'fd-form-group--inline' : '';
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
