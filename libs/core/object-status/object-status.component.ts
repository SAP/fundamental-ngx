import { NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { applyCssClass, ColorAccent, CssClassBuilder, Nullable, NullableObject } from '@fundamental-ngx/cdk/utils';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconComponent, IconFont } from '@fundamental-ngx/core/icon';
import { FD_OBJECT_STATUS_COMPONENT } from './tokens';

export type ObjectStatus = 'negative' | 'critical' | 'positive' | 'informative' | 'neutral';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-object-status]',
    template: `
        @if (glyph) {
            <fd-icon
                class="fd-object-status__icon"
                [glyph]="glyph"
                [font]="glyphFont"
                [attr.role]="glyphAriaLabel ? 'presentation' : ''"
                [ariaLabel]="glyphAriaLabel"
            >
            </fd-icon>
        }
        @if (textTemplate) {
            <span class="fd-object-status__text" [class]="_textClass">
                <ng-template [ngTemplateOutlet]="textTemplate"></ng-template>
            </span>
        }
        @if (label) {
            <span class="fd-object-status__text" [class]="_textClass">{{ label }}</span>
        }
    `,
    styleUrl: './object-status.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FD_OBJECT_STATUS_COMPONENT,
            useExisting: ObjectStatusComponent
        }
    ],
    host: {
        '[attr.tabindex]': 'clickable ? 0 : null'
    },
    imports: [IconComponent, NgTemplateOutlet]
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
    status: Nullable<ObjectStatus>;

    /**
     * Glyph (icon) of the Object Status.
     */
    @Input()
    glyph: Nullable<string>;

    /** Glyph font family */
    @Input()
    glyphFont: IconFont = FD_DEFAULT_ICON_FONT_FAMILY;

    /** Define the text content of the Object Status */
    @Input()
    label: Nullable<string>;

    /**
     * Label applied to glyph element, should be used when there is no text included
     */
    @Input()
    glyphAriaLabel: string;

    /**
     * A number representing the indication color.
     * For non-inverted state available numbers are from 1 to 8.
     * For inverted state available numbers are from 1 to 10.
     */
    @Input()
    indicationColor: Nullable<ColorAccent>;

    /** Whether the Object Status is clickable. */
    @Input()
    clickable = false;

    /** Whether the Object Status is inverted. */
    @Input({ transform: booleanAttribute })
    inverted = false;

    /** Whether the Object Status is in Large Design. */
    @Input()
    large = false;

    /** Whether to use secondary set of indication colors. */
    @Input()
    secondaryIndication = false;

    /**
     * Template reference for complex object status texts.
     */
    @Input()
    textTemplate: Nullable<TemplateRef<any>>;

    /** @hidden */
    _textClass: string;

    /** Whether the Object status is icon-only. */
    get iconOnly(): boolean {
        return !this.label && !this.textTemplate;
    }

    /** @hidden */
    constructor(public readonly elementRef: ElementRef) {}

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return buildObjectStatusCssClasses(this);
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }
}

type ObjectStatusData = NullableObject<{
    status: ObjectStatus;
    inverted: boolean;
    large: boolean;
    indicationColor: number;
    clickable: boolean;
    class: string;
    iconOnly: boolean;
    secondaryIndication: boolean;
}>;

export const buildObjectStatusCssClasses = (data: ObjectStatusData): string[] => [
    'fd-object-status',
    data.inverted ? 'fd-object-status--inverted' : '',
    data.large ? 'fd-object-status--large' : '',
    data.status ? `fd-object-status--${data.status}` : '',
    data.indicationColor
        ? `fd-object-status--indication-${data.indicationColor}${data.secondaryIndication ? 'b' : ''}`
        : '',
    data.clickable ? 'fd-object-status--link' : '',
    data.iconOnly ? 'fd-object-status--icon-only' : '',
    data.class || ''
];
