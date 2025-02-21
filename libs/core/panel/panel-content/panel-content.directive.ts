import { Directive, HostBinding, Input, booleanAttribute, input } from '@angular/core';

import { Nullable } from '@fundamental-ngx/cdk/utils';

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
        '[class.fd-panel__content--transparent]': 'transparent()'
    },
    standalone: true
})
export class PanelContentDirective {
    /** Custom height of the content container. */
    @Input()
    @HostBinding('style.height')
    height: Nullable<string>;

    /** Custom min-height of the content container. */
    @Input()
    @HostBinding('style.min-height')
    minHeight: Nullable<string>;

    /** Custom max-height of the content container. */
    @Input()
    @HostBinding('style.max-height')
    maxHeight: Nullable<string>;

    /** aria-label attribute of the host element element. */
    @Input()
    @HostBinding('attr.aria-label')
    ariaLabel: Nullable<string>;

    /** aria-labelledby attribute of the host element element. */
    @Input()
    @HostBinding('attr.aria-labelledby')
    ariaLabelledBy: Nullable<string>;

    /** role attribute of the host element. */
    @Input()
    @HostBinding('attr.role')
    role = 'region';

    /** Whether the content should have no padding. */
    noPadding = input(false, { transform: booleanAttribute });

    /** Whether the content has transparent background. */
    transparent = input(false, { transform: booleanAttribute });

    /** Id of the host element. */
    @Input()
    @HostBinding('attr.id')
    set id(value: string | undefined) {
        this._id = value || this._defaultId;
    }

    get id(): string {
        return this._id;
    }

    /** @hidden */
    private readonly _defaultId = 'fd-panel-content-' + panelContentUniqueId++;

    /** @hidden */
    private _id: string = this._defaultId;
}
