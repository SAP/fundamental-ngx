import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    ViewEncapsulation,
    OnInit
} from '@angular/core';
import { applyCssClass, CssClassBuilder } from '../utils/public_api';

export type ObjectStatus = 'negative' | 'critical' | 'positive' | 'informative';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-object-status]',
    template: `
        <i class="fd-object-status__icon" *ngIf="glyph" [ngClass]="'sap-icon--' + glyph" role="presentation"></i>
        <span class="fd-object-status__text">
            <ng-content></ng-content>
        </span>
    `,
    styleUrls: ['./object-status.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectStatusComponent implements OnChanges, OnInit, CssClassBuilder {
    /** User's custom classes */
    @Input()
    class: string;

    /**
     * The status represented by the Object Status.
     * Can be one of the following: 'negative' | 'critical' | 'positive' | 'informative'
     * For default Object Status omit this property
     */
    @Input()
    status: ObjectStatus;

    /**
     * Glyph (icon) of the Object Status.
     */
    @Input()
    glyph: string;

    /**
     * A number representing the indication color.
     * Option includes numbers from 1 to 8
     */
    @Input()
    indicationColor: number = null;

    /** Whether the Object Status is clickable. */
    @Input()
    clickable = false;

    /** Whether the Object Status is inverted. */
    @Input()
    inverted = false;

    /** Whether the Object Status is in Large Design. */
    @Input()
    large = false;

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [
            'fd-object-status',
            this.inverted ? 'fd-object-status--inverted' : '',
            this.large ? 'fd-object-status--large' : '',
            this.status ? `fd-object-status--${this.status}` : '',
            this.indicationColor ? `fd-object-status--indication-${this.indicationColor}` : '',
            this.clickable ? 'fd-object-status--link' : '',
            this.class
        ];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
