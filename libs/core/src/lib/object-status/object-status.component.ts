import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    ViewEncapsulation,
    OnInit
} from '@angular/core';
import { applyCssClass } from '@fundamental-ngx/core/utils';
import { CssClassBuilder } from '@fundamental-ngx/core/utils';

export type ObjectStatus = 'negative' | 'critical' | 'positive' | 'informative';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-object-status]',
    template: `
        <i
            class="fd-object-status__icon"
            *ngIf="glyph"
            [ngClass]="'sap-icon--' + glyph"
            [attr.role]="glyphAriaLabel ? 'presentation' : ''"
            [attr.aria-label]="glyphAriaLabel"
        ></i>
        <span *ngIf="label" class="fd-object-status__text">{{ label }}</span>

        <!-- DEPRECATED - Remove in v0.23.0 -->
        <ng-content></ng-content>
    `,
    styleUrls: ['./object-status.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.tabindex]': 'clickable ? 0 : -1'
    }
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

    /** Define the text content of the Object Status */
    @Input()
    label: string;

    /**
     * Label applied to glyph element, should be used when there is not text included
     */
    @Input()
    glyphAriaLabel: string;

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
        return buildObjectStatusCssClasses(this);
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}

export const buildObjectStatusCssClasses = ({
    status,
    inverted,
    large,
    indicationColor,
    clickable,
    class: className
}: Partial<{
    status: ObjectStatus;
    inverted: boolean;
    large: boolean;
    indicationColor: number;
    clickable: boolean;
    class: string;
}>): string[] => {
    return [
        'fd-object-status',
        inverted ? 'fd-object-status--inverted' : '',
        large ? 'fd-object-status--large' : '',
        status ? `fd-object-status--${status}` : '',
        indicationColor ? `fd-object-status--indication-${indicationColor}` : '',
        clickable ? 'fd-object-status--link' : '',
        className
    ];
};
