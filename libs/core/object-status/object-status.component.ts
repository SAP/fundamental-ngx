import { NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    inject,
    input,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { ColorAccent, HasElementRef, Nullable } from '@fundamental-ngx/cdk/utils';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconComponent, IconFont } from '@fundamental-ngx/core/icon';
import { FdLanguageKeyIdentifier, FdTranslatePipe, resolveTranslationSignal } from '@fundamental-ngx/i18n';
import { FD_OBJECT_STATUS_COMPONENT } from './tokens';

export type ObjectStatus = 'negative' | 'critical' | 'positive' | 'informative' | 'neutral';

export const OBJECT_STATUS_CLASS_NAME = 'fd-object-status';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-object-status]',
    templateUrl: 'object-status.component.html',
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
        '[attr.tabindex]': 'clickable() ? 0 : null',
        '[attr.role]': 'clickable() ? "button" : null',
        '[attr.aria-roledescription]': 'clickable() ? _ariaRoleDescription() : null',
        '[class]': '_cssClass()'
    },
    imports: [IconComponent, NgTemplateOutlet, FdTranslatePipe]
})
export class ObjectStatusComponent implements HasElementRef {
    /** @hidden */
    _textClass: string;

    /** @hidden Element reference */
    public readonly elementRef = inject(ElementRef);

    /**
     * The status represented by the Object Status.
     * Can be one of the following: 'negative' | 'critical' | 'positive' | 'informative'
     * For default Object Status omit this property
     */
    readonly status = input<Nullable<ObjectStatus>>();

    /** An optional status message for the Object Status. */
    readonly statusMessage = input<Nullable<string>>(null);

    /**
     * Glyph (icon) of the Object Status.
     */
    readonly glyph = input<Nullable<string>>();

    /** Glyph font family */
    readonly glyphFont = input<IconFont>(FD_DEFAULT_ICON_FONT_FAMILY);

    /** Define the text content of the Object Status */
    readonly label = input<Nullable<string>>();

    /**
     * Accessible label for screen readers.
     * Used in the screen-reader-only span element to provide context for assistive technologies.
     */
    readonly ariaLabel = input<string>();

    /**
     * Label applied to glyph element, should be used when there is no text included
     */
    readonly glyphAriaLabel = input<string>();

    /**
     * A number representing the indication color.
     * For non-inverted state available numbers are from 1 to 8.
     * For inverted state available numbers are from 1 to 10.
     */
    readonly indicationColor = input<Nullable<ColorAccent>>();

    /** Whether the Object Status is clickable. */
    readonly clickable = input(false, { transform: booleanAttribute });

    /** Whether the Object Status is inverted. */
    readonly inverted = input(false, { transform: booleanAttribute });

    /** Whether the Object Status is in Large Design. */
    readonly large = input(false, { transform: booleanAttribute });

    /** Whether to use secondary set of indication colors. */
    readonly secondaryIndication = input(false, { transform: booleanAttribute });

    /**
     * Template reference for complex object status texts.
     */
    readonly textTemplate = input<Nullable<TemplateRef<any>>>();

    /** Aria role description for the object status. */
    readonly ariaRoleDescription = input<string>();

    /** @hidden */
    protected readonly _ariaRoleDescription = computed(
        () => this.ariaRoleDescription() || this.defaultAriaRoleDescription()
    );

    /** @hidden */
    protected readonly indicationColorCode = computed<string>(
        () => ` ${this.indicationColor() ?? ''}${this.secondaryIndication() ? 'b' : ''}`
    );

    /** @hidden */
    protected readonly statusTranslateKey = computed<FdLanguageKeyIdentifier | null>(() => {
        const status = this.status();
        if (this.isValidObjectStatus(status) && status !== 'neutral') {
            return `coreObjectStatus.${status}`;
        }
        return null;
    });

    /** @hidden Computed CSS classes */
    protected readonly _cssClass = computed(() =>
        [
            OBJECT_STATUS_CLASS_NAME,
            this.inverted() ? 'fd-object-status--inverted' : '',
            this.large() ? 'fd-object-status--large' : '',
            this.status() ? `fd-object-status--${this.status()}` : '',
            this.indicationColor()
                ? `fd-object-status--indication-${this.indicationColor()}${this.secondaryIndication() ? 'b' : ''}`
                : '',
            this.clickable() ? 'fd-object-status--link' : '',
            this.iconOnly() ? 'fd-object-status--icon-only' : ''
        ]
            .filter(Boolean)
            .join(' ')
    );

    /** @hidden */
    private readonly defaultAriaRoleDescription = resolveTranslationSignal('coreObjectStatus.ariaRoleDescription');

    /** Whether the Object status is icon-only. */
    private readonly iconOnly = computed((): boolean => !this.label() && !this.textTemplate());

    /**
     * Type guard to check if the status is a valid ObjectStatus
     * @hidden
     */
    private isValidObjectStatus(status: Nullable<ObjectStatus>): status is ObjectStatus {
        return status === 'negative' || status === 'critical' || status === 'positive' || status === 'informative';
    }
}
