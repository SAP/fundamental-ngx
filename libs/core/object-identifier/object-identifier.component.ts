import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewEncapsulation,
    booleanAttribute,
    computed,
    contentChildren,
    effect,
    input
} from '@angular/core';
import { FD_LINK_COMPONENT } from '@fundamental-ngx/core/link';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';

let objectIdentifierId = 0;

@Component({
    selector: 'fd-object-identifier',
    template: `
        <p class="fd-object-identifier__title" [class.fd-object-identifier__title--bold]="bold()" [attr.id]="titleId()">
            <ng-content></ng-content>
        </p>
        @if (description()) {
            <p class="fd-object-identifier__text" [attr.id]="textId()">
                {{ description() }}
            </p>
        }
        <span
            class="fd-object-identifier__sr-only"
            [attr.id]="descriptionId()"
            [attr.aria-hidden]="hasLinks() ? 'true' : null"
        >
            {{ ariaLabel() || ('coreObjectIdentifier.srOnlyAriaLabel' | fdTranslate) }}
        </span>
    `,
    styleUrl: './object-identifier.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FdTranslatePipe],
    host: {
        class: 'fd-object-identifier',
        '[attr.id]': 'id()',
        '[class.fd-object-identifier--medium]': 'medium()'
    }
})
export class ObjectIdentifierComponent {
    /**
     * Object Identifier ID
     * If not set, a default value is provided
     */
    readonly id = input('fd-object-identifier-' + ++objectIdentifierId);

    /**
     * Optional description text to display below the title.
     * When provided, renders as a paragraph with the class `fd-object-identifier__text`.
     */
    readonly description = input<string>();

    /**
     * Accessible label for screen readers.
     * Used in the screen-reader-only span element to provide context for assistive technologies.
     */
    readonly ariaLabel = input<string>();

    /**
     * Whether to apply bold styling to the title.
     * When true, adds the `fd-object-identifier__title--bold` class to the title element.
     * @default false
     */
    readonly bold = input(false, { transform: booleanAttribute });

    /**
     * Whether to apply medium sizing to the component.
     * When true, adds the `fd-object-identifier--medium` class to the host element.
     * @default false
     */
    readonly medium = input(false, { transform: booleanAttribute });

    /** Computed ID for the description text element */
    protected readonly textId = computed(() => `${this.id()}-text`);

    /** Computed ID for the title element */
    protected readonly titleId = computed(() => `${this.id()}-title`);

    /** Computed ID for the screen-reader only description element */
    protected readonly descriptionId = computed(() => `${this.id()}-description`);

    /** Whether any link components are projected via content projection */
    protected readonly hasLinks = computed(() => this._linkComponents().length > 0);

    /** Query for all projected link components to apply identifier-specific styling and ARIA attributes */
    private readonly _linkComponents = contentChildren(FD_LINK_COMPONENT, { read: ElementRef });

    /** @hidden */
    constructor() {
        effect(() => {
            this._applyLinkAttributes();
        });
    }

    /** Applies identifier-specific CSS class and ARIA attributes to all link components */
    private _applyLinkAttributes(): void {
        const ariaLabelledBy = this.description() ? `${this.descriptionId()} ${this.textId()}` : this.descriptionId();

        this._linkComponents().forEach((link) => {
            link.nativeElement.classList.add('fd-object-identifier__link');
            link.nativeElement.setAttribute('aria-labelledby', ariaLabelledBy);
        });
    }
}
