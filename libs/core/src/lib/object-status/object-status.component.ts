import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { applyCssClass, CssClassBuilder } from '../utils/public_api';

type ObjectStatus = 'negative' | 'critical' | 'positive' | 'informative';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-object-status]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./object-status.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectStatusComponent implements OnChanges, CssClassBuilder {
    /** User's custom classes */
    @Input()
    public class: string;

    /**
     * The status represented by the Object Status.
     * Can be one of the following: 'negative' | 'critical' | 'positive' | 'informative'
     * For default Object Status omit this property
     */
    @Input()
    public status: ObjectStatus;

    /**
     * Glyph (icon) of the Object Status.
     */
    @Input()
    public glyph: string;

    /**
     * A number representing the indication color.
     * Option includes numbers from 1 to 8
     */
    @Input()
    public indicationColor: number = null;

    /** Whether the Object Status is clickable. */
    @Input()
    public clickable: boolean = false;

    /** Whether the Object Status is inverted. */
    @Input()
    public inverted: boolean = false;

    /** Whether the Object Status is in Large Design. */
    @Input()
    public large: boolean = false;

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    public ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    public buildComponentCssClass(): string {
        return [
            'fd-object-status',
            this.inverted ? 'fd-object-status--inverted' : '',
            this.large ? 'fd-object-status--large' : '',
            this.status ? `fd-object-status--${this.status}` : '',
            this.glyph ? `sap-icon--${this.glyph}` : '',
            this.indicationColor ? `fd-object-status--indication-${this.indicationColor}` : '',
            this.clickable ? 'fd-object-status--link' : '',
            this.class,
        ]
            .filter((x) => x !== '')
            .join(' ');
    }

    /** @hidden */
    public elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
