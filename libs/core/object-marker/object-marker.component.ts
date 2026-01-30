import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    inject,
    input,
    ViewEncapsulation
} from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconComponent, IconFont } from '@fundamental-ngx/core/icon';
import { resolveTranslationSignal } from '@fundamental-ngx/i18n';

let objectMarkerId = 0;

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-object-marker]',
    templateUrl: './object-marker.component.html',
    styleUrl: './object-marker.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-object-marker',
        '[class.fd-object-marker--link]': 'clickable()',
        '[attr.id]': 'id()',
        '[attr.tabindex]': 'clickable() ? 0 : -1',
        '[attr.role]': 'role()',
        '[attr.aria-labelledby]': 'computedAriaLabelledBy()'
    },
    imports: [IconComponent]
})
export class ObjectMarkerComponent implements HasElementRef {
    /**
     * Object Marker ID
     * If not set, a default value is provided
     */
    readonly id = input('fd-object-marker-' + ++objectMarkerId);

    /** Sets aria-labelledby attribute for object marker */
    readonly ariaLabelledBy = input<string>();

    /** Status text for the Object Status. */
    readonly statusText = input<string>();

    /** Glyph (icon) of the Object Status.*/
    readonly glyph = input<string>();

    /** Glyph font family */
    readonly glyphFont = input<IconFont>(FD_DEFAULT_ICON_FONT_FAMILY);

    /** Whether the Object Status is clickable. */
    readonly clickable = input(false);

    /** Define the text content of the Object Status */
    readonly label = input<string>();

    /** Title attribute for the Object Status */
    readonly title = input<string>();

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** Computed ID for the screen-reader only element */
    protected readonly srOnlyId = computed(() => `${this.id()}-sr-only`);

    /** Computed ID for the label element */
    protected readonly labelId = computed(() => `${this.id()}-label`);

    /** Computed ID for the screen-reader only element for icon-only object marker */
    protected readonly srOnlyIconOnlyId = computed(() => `${this.id()}-sr-only-icon-only`);

    /** @hidden Role attribute for the object marker */
    protected readonly role = computed(() =>
        this.clickable() ? 'link' : this.glyph() && !this.label() ? 'img' : undefined
    );

    /** @hidden Role attribute for the icon */
    protected readonly iconRole = computed(() => (this.label() ? 'presentation' : undefined));

    /** @hidden Computed status text (uses custom or default) */
    protected readonly statusText$ = computed(() => this.statusText() ?? this._defaultStatusText());

    /** @hidden Computed title for icon (only when no label exists) */
    protected readonly iconTitle = computed(() => {
        if (!this.glyph() || this.label()) {
            return undefined;
        }
        return this.title() ?? this.glyph();
    });

    /** @hidden Computed aria-labelledby attribute */
    protected readonly computedAriaLabelledBy = computed(() => {
        if (this.ariaLabelledBy()) {
            return this.ariaLabelledBy();
        }

        if (this.glyph() && !this.label()) {
            return `${this.srOnlyId()} ${this.srOnlyIconOnlyId()}`;
        }

        return `${this.srOnlyId()} ${this.labelId()}`;
    });

    /** @hidden Translation signal for active state */
    private readonly _activeStatusText = resolveTranslationSignal('coreObjectMarker.active');

    /** @hidden Translation signal for inactive state */
    private readonly _inactiveStatusText = resolveTranslationSignal('coreObjectMarker.inactive');

    /** @hidden Default status text for the Object Marker. */
    private readonly _defaultStatusText = computed(() =>
        this.clickable() ? this._activeStatusText() : this._inactiveStatusText()
    );
}
