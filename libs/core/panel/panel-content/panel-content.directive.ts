import { Directive, booleanAttribute, computed, input } from '@angular/core';

let panelContentUniqueId = 0;

/**
 * Applies the panel content style to a div element.
 *
 * ```html
 * <div fd-panel-content>Panel Content</div>
 * ```
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-panel-content]',
    host: {
        class: 'fd-panel__content',
        '[class.fd-panel__content--no-padding]': 'noPadding()',
        '[class.fd-panel__content--transparent]': 'transparent()',
        '[style.height]': 'height()',
        '[style.min-height]': 'minHeight()',
        '[style.max-height]': 'maxHeight()',
        '[attr.aria-label]': 'ariaLabel()',
        '[attr.aria-labelledby]': 'ariaLabelledBy()',
        '[attr.role]': 'role()',
        '[attr.id]': '_resolvedId()'
    }
})
export class PanelContentDirective {
    /** Custom height of the content container. */
    readonly height = input<string | null>(null);

    /** Custom min-height of the content container. */
    readonly minHeight = input<string | null>(null);

    /** Custom max-height of the content container. */
    readonly maxHeight = input<string | null>(null);

    /** aria-label attribute of the host element element. */
    readonly ariaLabel = input<string | null>(null);

    /** aria-labelledby attribute of the host element element. */
    readonly ariaLabelledBy = input<string | null>(null);

    /** role attribute of the host element. */
    readonly role = input('region');

    /** Whether the content should have no padding. */
    readonly noPadding = input(false, { transform: booleanAttribute });

    /** Whether the content has transparent background. */
    readonly transparent = input(false, { transform: booleanAttribute });

    /** @hidden Signal input backing the id; template uses [id]="..." via alias. */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    readonly _idInput = input<string | undefined>(undefined, { alias: 'id' });

    /** Id of the host element. */
    get id(): string {
        return this._resolvedId();
    }

    /** @hidden */
    readonly _resolvedId = computed(() => this._idInput() ?? this._defaultId);

    /** @hidden */
    private readonly _defaultId = 'fd-panel-content-' + panelContentUniqueId++;
}
