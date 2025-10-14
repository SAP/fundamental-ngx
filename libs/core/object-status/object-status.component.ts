import { NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    ElementRef,
    inject,
    Input,
    OnChanges,
    OnInit,
    signal,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { applyCssClass, ColorAccent, CssClassBuilder, Nullable, NullableObject } from '@fundamental-ngx/cdk/utils';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconComponent, IconFont } from '@fundamental-ngx/core/icon';
import {
    FD_LANGUAGE,
    FdLanguage,
    FdLanguageKeyIdentifier,
    FdTranslatePipe,
    TranslationResolver
} from '@fundamental-ngx/i18n';
import { map } from 'rxjs';
import { FD_OBJECT_STATUS_COMPONENT } from './tokens';

export type ObjectStatus = 'negative' | 'critical' | 'positive' | 'informative' | 'neutral';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-object-status]',
    templateUrl: './object-status.component.html',
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
        '[attr.tabindex]': 'clickable ? 0 : null',
        '[attr.role]': 'clickable ? "button" : null',
        '[attr.aria-roledescription]': 'clickable ? _ariaRoleDescription() : null'
    },
    imports: [IconComponent, NgTemplateOutlet, FdTranslatePipe]
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

    /** @hidden */
    _indicationColorCode = computed<string>(
        () => ` ${this.indicationColor ?? ''}${this.secondaryIndication ? 'b' : ''}`
    );

    /** @hidden */
    _statusTranslateKey = computed<FdLanguageKeyIdentifier | null>(() => {
        switch (this.status) {
            case 'negative':
                return 'coreObjectStatus.negative';
            case 'critical':
                return 'coreObjectStatus.critical';
            case 'positive':
                return 'coreObjectStatus.positive';
            case 'informative':
                return 'coreObjectStatus.informative';
            default:
                return null;
        }
    });

    /** Whether the Object status is icon-only. */
    get iconOnly(): boolean {
        return !this.label && !this.textTemplate;
    }

    /** @hidden */
    private readonly _ariaRoleDescription = signal<string>('');

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _lang$ = inject(FD_LANGUAGE);

    /** @hidden */
    private _translationResolver = inject(TranslationResolver);

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
        this._setAriaRoleDescription();
    }

    /** @hidden */
    private _setAriaRoleDescription(): void {
        this._lang$
            .pipe(
                takeUntilDestroyed(this._destroyRef),
                map((lang: FdLanguage) =>
                    this._translationResolver.resolve(lang, 'coreObjectStatus.ariaRoleDescription')
                )
            )
            .subscribe((res) => {
                this._ariaRoleDescription.set(res);
            });
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
