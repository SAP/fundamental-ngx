import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

/**
 * The directive that represents an identifier.
 * Identifier is a way to visually present something using an icon or user initials.
 *
 * ```html
 * <span fd-identifier [size]="'l'" [glyph]="'washing-machine'"></span>
 * ```
 */
@Component({
    // TODO to be discussed
    // tslint:disable-next-line:component-selector
    selector: '[fd-identifier]',
    host: {
        role: 'presentation',
    },
    template: `<ng-content></ng-content>`,
    styleUrls: ['./identifier.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentifierComponent extends AbstractFdNgxClass {
    /**
     * The size of the identifier.
     * The predefined values for the size are *xxs*, *xs*, *s*, *m*, *l*, *xl* and *xxl*.
     *  *size* can accept any other string, for example *xxxs*, which will be translated into class *fd-identifier--xxxs*.
     */
    @Input() size: string;

    /**
     * Whether to render a circle style for the identifier.
     */
    @Input() circle: boolean;

    /**
     * Whether to render a transparent style for the identifier.
     */
    @Input() transparent: boolean;

    /** A number specifying the background color of the identifier. */
    @Input() colorAccent: number;

    /** The glyph name */
    @Input() glyph: string;

    /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-identifier');
        if (this.size) {
            this._addClassToElement('fd-identifier--' + this.size);
        }
        if (this.circle) {
            this._addClassToElement('fd-identifier--circle');
        }
        if (this.transparent) {
            this._addClassToElement('fd-identifier--transparent');
        }
        if (this.colorAccent) {
            this._addClassToElement('fd-has-background-color-accent-' + this.colorAccent);
        }
        if (this.glyph) {
            this._addClassToElement('sap-icon--' + this.glyph);
        }
    }

    /** @hidden */
    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
