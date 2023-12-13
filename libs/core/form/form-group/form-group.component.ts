import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';

/**
 * Represents a form group element.
 *
 * ```html
 * <fd-form-group>
 *     <div fd-form-item>
 *         <input fd-form-control type="radio" checked>
 *         <fd-form-label>Option One</fd-form-label>
 *     </div>
 * </fd-form-group>
 * ```
 */
@Component({
    selector: 'fd-form-group',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    styleUrl: './form-group.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class FormGroupComponent implements CssClassBuilder, OnChanges, OnInit {
    /** @ignore */
    @HostBinding('class.fd-form-group')
    fdFormGroupClass = true;

    /** Determines if form items should be displayed inline or not
     * Default value is set to false;
     */
    @Input()
    isInline: boolean;

    /** @ignore */
    class: string;

    /** @ignore */
    constructor(public elementRef: ElementRef) {}

    /** @ignore */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @ignore */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** This method is responsible for building a css class based on current state
     *  It is implementation of CssClassBuilder interface and
     *  should be used with @applyCssClass decorator
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [this.isInline ? 'fd-form-group--inline' : ''];
    }
}
